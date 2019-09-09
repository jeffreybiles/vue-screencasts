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
      let data = await Api().get("/videos");
      let videos = data.data;
      commit("SET_VIDEOS", videos);
    }
  },
  modules: {}
});
