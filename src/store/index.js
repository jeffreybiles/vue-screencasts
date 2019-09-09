import Vue from "vue";
import Vuex from "vuex";
import Api from "@/services/api";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    videos: []
  },
  mutations: {
    SET_VIDEOS(state, videos) {
      state.videos = videos;
    }
  },
  actions: {
    async loadVideos({commit}){
      let results = await Api().get("/videos");
      let videos = results.data.data.filter(d => d.type === "video");
      commit("SET_VIDEOS", videos.map(v => v.attributes));
    }
  },
  modules: {}
});
