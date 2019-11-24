import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { Server } from "@miragejs/server";
import videoJSON from "./mirage/videos.json";

let server = new Server({
  routes() {
    this.get("/videos", function({db}, request) {
      return db.videos;
    });
  }
});
})

server.db.loadData({ videos: videoJSON})


Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
