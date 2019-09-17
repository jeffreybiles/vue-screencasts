import Vue from "vue";
import Vuex from "vuex";
import Api from "@/services/api";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    videos: [],
    tags: [],
    playedVideos: [],
    users: [],
    currentUser: {}
  },
  mutations: {
    SET_VIDEOS(state, videos) {
      state.videos = videos;
    },
    SET_TAGS(state, tags) {
      state.tags = tags;
    },
    SET_PLAYED_VIDEOS(state, playedVideos) {
      state.playedVideos = playedVideos;
    },
    MARK_VIDEO_PLAYED(state, videoId) {
      let playedVideos = state.playedVideos.concat(videoId);
      state.playedVideos = playedVideos;
      window.localStorage.playedVideos = JSON.stringify(playedVideos);
    },
    ADD_VIDEO(state, video) {
      let videos = state.videos.concat(video);
      state.videos = videos;
    },
    SET_USERS(state, users) {
      state.users = users
    },
    SET_CURRENT_USER(state, user) {
      state.currentUser = user;
    },
  },
  actions: {
    async loadVideos({commit}){
      let response = await Api().get('/videos');
      let videos = response.data.data;
      let tags = response.data.included.filter(i => i.type === "tag")
      tags.forEach(t => {
        t.attributes.id = t.id;
        t.attributes.video_ids = t.relationships.videos.data.map(v => v.id);
      });
      videos.forEach(v => {
        v.attributes.tag_ids = v.relationships.tags.data.map(t => t.id);
      });

      commit('SET_VIDEOS', videos.map(v => v.attributes));
      commit('SET_TAGS', tags.map(t => t.attributes));

      let playedVideos = JSON.parse(window.localStorage.playedVideos);
      commit('SET_PLAYED_VIDEOS', playedVideos);
    },
    markPlayed({commit}, videoId) {
      commit('MARK_VIDEO_PLAYED', videoId);
    },
    async createVideo({commit}, video) {
      let response = await Api().post('/videos', video);
      let savedVideo = response.data.data.attributes;
      commit('ADD_VIDEO', savedVideo);
      return savedVideo;
    },
    async loadUsers({commit}) {
      let response = await Api().get('/users');
      let users = response.data.data;
      commit('SET_USERS', users.map(u => u.attributes));
    },
    async setCurrentUser({commit}, user) {
      commit('SET_CURRENT_USER', user)
    }
  },
  modules: {},
  getters: {
    getTag: state => id => {
      return state.tags.find(t => t.id == id)
    }
  }
});
