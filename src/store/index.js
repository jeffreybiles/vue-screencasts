import Vue from "vue";
import Vuex from "vuex";
import Api from "@/services/api";
import snackbarModule from './snackbar';
import tagsModule from './tags';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    snackbar: snackbarModule,
    tags: tagsModule
  },
  state: {
    videos: [],
    users: [],
    currentUser: {}
  },
  mutations: {
    SET_VIDEOS(state, videos) {
      state.videos = videos
    },
    SET_PLAYED_VIDEOS(state, playedVideos) {
      Vue.set(state.currentUser, 'playedVideos', playedVideos);
    },
    SET_USERS(state, users) {
      state.users = users;
    },
    MARK_VIDEO_PLAYED(state, videoId) {
      let playedVideos = state.currentUser.playedVideos.concat(videoId);
      state.currentUser.playedVideos = playedVideos;
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
  },
  actions: {
    async loadVideos({commit, dispatch}){
      let response = await Api().get('/videos');
      let videos = response.data.data;
      videos.forEach(v => {
        v.attributes.id = v.id;
        v.attributes.tag_ids = v.relationships.tags.data.map(t => t.id);
      });

      commit('SET_VIDEOS', videos.map(v => v.attributes));
    },
    async loadUsers({commit}) {
      let response = await Api().get('/users');
      let users = response.data.data;
      commit('SET_USERS', users.map(u => u.attributes));
    },
    async loadCurrentUser({commit, dispatch}) {
      let user = JSON.parse(window.localStorage.currentUser);
      commit('SET_CURRENT_USER', user);
      dispatch('loadPlayedVideos', user.id);
    },
    async loadPlayedVideos({commit}, userId) {
      let response = await Api().get(`users/${userId}`);
      let user = response.data.data.attributes;
      commit('SET_PLAYED_VIDEOS', user.playedVideos)
    },
    markPlayed({commit, state}, videoId) {
      if(state.currentUser.name){
        commit('MARK_VIDEO_PLAYED', videoId);
        Api().post(`/video_plays`, {
          video_id: videoId
        });
      }
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
    async loginUser({commit, dispatch}, loginInfo) {
      try {
        let response = await Api().post('/sessions', loginInfo);
        let user = response.data.data;
        user.attributes.id = user.id
  
        commit('SET_CURRENT_USER', user.attributes);
        dispatch('loadPlayedVideos', user.id);
        return user.attributes;
      } catch {
        return {error: "Email/password combination was incorrect.  Please try again."}
      }
      
    },
    async registerUser({commit, dispatch}, registrationInfo) {
      try {
        let response = await Api().post('/users', registrationInfo);
        let user = response.data.data;
        user.attributes.id = user.id;

        commit('SET_CURRENT_USER', user.attributes);
        dispatch('loadPlayedVideos', user.id);
        return user.attributes;
      } catch {
        return { error: "There was an error.  Please try again." }
      }
    },
  },
  getters: {
    playedVideos: state => {
      return state.currentUser.playedVideos || [];
    },
    isPlayed: (state, getters) => videoId => {
      return getters.playedVideos.includes(videoId)
    }
  }
});
