import express from "express";
import { createServer } from "vite";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const initServer = async () => {
  const app = express();

  const vite = await createServer({
    server: { middlewareMode: true },
    appType: "custom",
  });

  app.use(vite.middlewares);
  app.use("*", async (req, res) => {
    let template = fs.readFileSync(
      path.resolve(__dirname, "index.html"),
      "utf-8",
    );

    template = await vite.transformIndexHtml(req.originalUrl, template);

    const render = (await vite.ssrLoadModule("/src/entry-server.js")).render;

    const { html: appHtml } = await render();

    const html = template.replace("<!--main-app-->", appHtml);

    res
      .set({
        "Content-Type": "text/html",
      })
      .end(html);
  });
  return app;
};

initServer().then((app) =>
  app.listen(5000, () => {
    console.log("Server is listening at port 5000...");
  }),
);
