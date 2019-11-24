import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { Server, JSONAPISerializer, Model } from "miragejs";
import videoJSON from "./mirage/videos.json";

let server = new Server({
  serializers: {
    application: JSONAPISerializer
  },
  fixtures: {
    videos: videoJSON
  },
  models: {
    video: Model
  },
  routes() {
    this.get("/videos")
  }
})

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
