import Api from "@/services/api";

export default {
  namespaced: true,
  state: {
    videos: [],
  },
  mutations: {
    SET_VIDEOS(state, videos) {
      state.videos = videos;
    },
    ADD_VIDEO(state, video) {
      let videos = state.videos.concat(video);
      state.videos = videos;
    },
    DELETE_VIDEO(state, videoId){
      let videos = state.videos.filter(v => v.id != videoId)
      state.videos = videos;
    },
    EDIT_VIDEO(state, video) {
      let v = state.videos.find(v => v.id == video.id)
      v = video;
    },
  },
  actions: {
    async loadAll({commit, dispatch}){
      let response = await Api().get('/videos');
      let videos = response.data.data;
      videos.forEach(v => {
        v.attributes.tag_ids = v.relationships.tags.data.map(t => t.id);
      });

      commit('SET_VIDEOS', videos.map(v => v.attributes));
    },
    async create({commit}, video) {
      let response = await Api().post('/videos', video);
      let savedVideo = response.data.data.attributes;
      commit('ADD_VIDEO', savedVideo);
      return savedVideo;
    },
    async delete({commit}, video) {
      let response = await Api().delete(`/videos/${video.id}`);
      if(response.status == 200 || response.status == 204){
        commit('DELETE_VIDEO', video.id);
      }
    },
    async edit({commit}, video) {
      let response = await Api().put(`/videos/${video.id}`, video);
      let newVideo = response.data.data.attributes;
      commit('EDIT_VIDEO', newVideo);
      return newVideo;
    },
  }
}