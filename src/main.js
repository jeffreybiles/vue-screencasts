import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { Server, JSONAPISerializer, Model, hasMany } from "miragejs";
import videoJSON from "./mirage/videos.json";
import tagsJSON from "./mirage/tags.json";

let server = new Server({
  serializers: {
    application: JSONAPISerializer,
    video: JSONAPISerializer.extend({
      include: ['tags']
    }),
    tag: JSONAPISerializer.extend({
      include: ['videos']
    })
  },
  fixtures: {
    videos: videoJSON,
    tags: tagsJSON
  },
  models: {
    video: Model.extend({
      tags: hasMany()
    }),
    tag: Model.extend({
      videos: hasMany()
    })
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
