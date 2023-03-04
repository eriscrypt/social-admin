import { createApp } from "vue";
import router from "./router";
import { Connector, EVENTS } from "vue-dapp-connector";
import { MotionPlugin } from "@vueuse/motion";

import App from "./App.vue";
import "./assets/scss/style.scss";

const app = createApp(App);
const pinia = createPinia();
const connector = new Connector();

app.use(pinia);
app.use(router);
app.use(MotionPlugin);

connector
  .authenticate()
  .catch(console.error)
  .finally(() => {
    app.provide("connector", connector);
    app.mount("#app");
  });

connector.on(EVENTS.DISCONNECTED, () => {
  localStorage.clear();
  window.location.reload();
});

connector.on(EVENTS.CHAIN_CHANGED, () => {
  window.location.reload();
});

connector.on(EVENTS.UPDATED, () => {
  localStorage.clear();
  window.location.reload();
});
