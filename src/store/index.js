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
    currentUser: {},
    snackbars: []
  },
  mutations: {
    SET_VIDEOS(state, videos) {
      state.videos = videos
    },
    SET_TAGS(state, tags) {
      state.tags = tags;
    },
    SET_PLAYED_VIDEOS(state, playedVideos) {
      state.playedVideos = playedVideos;
    },
    SET_USERS(state, users) {
      state.users = users;
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
    DELETE_VIDEO(state, videoId){
      let videos = state.videos.filter(v => v.id != videoId)
      state.videos = videos;
    },
    EDIT_VIDEO(state, video) {
      let v = state.videos.find(v => v.id == video.id)
      v = video;
    },
    LOGOUT_USER(state) {
      state.currentUser = {}
      window.localStorage.currentUser = JSON.stringify({});
    },
    SET_CURRENT_USER(state, user) {
      state.currentUser = user;
      window.localStorage.currentUser = JSON.stringify(user);
    },
    SET_SNACKBAR(state, snackbar) {
      state.snackbars = state.snackbars.concat(snackbar);
    },
  },
  actions: {
    async loadVideos({commit}){
      let response = await Api().get('/videos');
      let videos = response.data.data;
      let tags = response.data.included.filter(i => i.type === "tags")
      tags.forEach(t => {
        t.attributes.id = t.id;
        t.attributes.video_ids = t.relationships.videos.data.map(v => v.id);
      });
      videos.forEach(v => {
        v.attributes.id = v.id;
        v.attributes.tag_ids = v.relationships.tags.data.map(t => t.id);
      });

      commit('SET_VIDEOS', videos.map(v => v.attributes));
      commit('SET_TAGS', tags.map(t => t.attributes));

      let playedVideos = JSON.parse(window.localStorage.playedVideos);
      commit('SET_PLAYED_VIDEOS', playedVideos);
    },
    async loadUsers({commit}) {
      let response = await Api().get('/users');
      let users = response.data.data;
      commit('SET_USERS', users.map(u => u.attributes));
    },
    async loadCurrentUser({commit}) {
      let user = JSON.parse(window.localStorage.currentUser);
      commit('SET_CURRENT_USER', user);
    },
    markPlayed({commit}, videoId) {
      commit('MARK_VIDEO_PLAYED', videoId);
    },
    async createVideo({commit}, video) {
      let response = await Api().post('/videos', video);
      let savedVideo = response.data.data;
      savedVideo = {id: savedVideo.id, ...savedVideo.attributes}
      commit('ADD_VIDEO', savedVideo);
      return savedVideo;
    },
    async deleteVideo({commit}, video) {
      let response = await Api().delete(`/videos/${video.id}`);
      if(response.status == 200 || response.status == 204){
        commit('DELETE_VIDEO', video.id);
      }
    },
    async editVideo({commit}, video) {
      let response = await Api().put(`/videos/${video.id}`, video);
      let newVideo = response.data.data.attributes;
      commit('EDIT_VIDEO', newVideo);
      return newVideo;
    },
    logoutUser({commit}) {
      commit('LOGOUT_USER');
    },
    async loginUser({commit}, loginInfo) {
      try {
        let response = await Api().post('/sessions', loginInfo);
        let user = response.data.data;
        user.attributes.id = user.id
  
        commit('SET_CURRENT_USER', user.attributes);
        return user.attributes;
      } catch {
        return {error: "Email/password combination was incorrect.  Please try again."}
      }
      
    },
    async registerUser({commit}, registrationInfo) {
      try {
        let response = await Api().post('/users', registrationInfo);
        let user = response.data.data;
        user.attributes.id = user.id;

        commit('SET_CURRENT_USER', user.attributes);
        return user.attributes;
      } catch {
        return { error: "There was an error.  Please try again." }
      }
    },
    setSnackbar({commit}, snackbar) {
      snackbar.showing = true;
      snackbar.color = snackbar.color || 'success';
      commit('SET_SNACKBAR', snackbar);
    },
  },
  modules: {},
  getters: {
    getTag: state => id => {
      return state.tags.find(t => t.id == id)
    }
  }
});
