import Vue from "vue";
import Vuex from "vuex";
import Api from "@/services/api";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    videos: [],
    tags: [],
  },
  mutations: {
    SET_VIDEOS(state, videos) { state.videos = videos; },
    SET_TAGS(state, tags) { state.tags = tags; },
  },
  actions: {
    async loadVideos({commit}){
      let results = await Api().get("/videos");
      let videos = results.data.data.filter(d => d.type === "video");
      let tags = results.data.included.filter(d => d.type === "tag");
      tags.forEach(t => {
        t.attributes.video_ids = t.relationships.videos.data.map(v => v.id);
        t.attributes.id = t.id;
      })
      videos.forEach(v => v.attributes.tag_ids = v.relationships.tags.data.map(t => t.id))
      commit("SET_VIDEOS", videos.map(v => v.attributes));
      commit("SET_TAGS", tags.map(t => t.attributes));
    }
  },
  modules: {}
});
