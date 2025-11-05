import { createApp } from "vue";
import { VueDatePicker } from "@vuepic/vue-datepicker";
import "bootstrap/dist/css/bootstrap.min.css";
import "@vuepic/vue-datepicker/dist/main.css";

import App from "./App.vue";
import router from "./router.js";
import store from "./store/index.js";

const app = createApp(App);

app.use(store);
app.use(router);

app.component("VueDatePicker", VueDatePicker);

router.isReady().then(() => {
  app.mount("#app");
});
