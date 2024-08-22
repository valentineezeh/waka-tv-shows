import { renderToString } from "@vue/server-renderer";
import { createPinia } from "pinia";
import { createApp } from "./main.server.js";
import router from "@/router";

export const render = async () => {
  const { app } = createApp();

  const pinia = createPinia();
  app.use(pinia);

  app.use(router);

  const html = await renderToString(app);

  return { html };
};
