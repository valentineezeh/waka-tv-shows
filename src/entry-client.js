import { createApp } from "./main.server";
import router from "@/router";
import { createPinia } from "pinia";

import "./assets/main.css";

const { app } = createApp();

const pinia = createPinia();
app.use(pinia);

app.use(router);
app.mount("#app");
