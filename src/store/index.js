import Vue from "vue";
import Vuex from "vuex";
import Api from "@/services/api";
import snackbarModule from './snackbar';
import tagsModule from './tags';
import videosModule from './videos';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    snackbar: snackbarModule,
    tags: tagsModule,
    videos: videosModule
  },
  state: {
    users: [],
    currentUser: {}
  },
  mutations: {
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
      commit('SET_PLAYED_VIDEOS', user.played_video_ids)
    },
    markPlayed({commit, state}, videoId) {
      if(state.currentUser.name){
        commit('MARK_VIDEO_PLAYED', videoId);
        Api().post(`/video_plays`, {
          video_id: videoId
        });
      }
    },
    logoutUser({commit}) {
      commit('LOGOUT_USER');
    },
    async loginUser({commit, dispatch}, loginInfo) {
      try {
        let response = await Api().post('/sessions', loginInfo);
        let user = response.data.data.attributes;
  
        commit('SET_CURRENT_USER', user);
        dispatch('loadPlayedVideos', user.id);
        return user;
      } catch {
        return {error: "Email/password combination was incorrect.  Please try again."}
      }
      
    },
    async registerUser({commit, dispatch}, registrationInfo) {
      try {
        let response = await Api().post('/users', registrationInfo);
        let user = response.data.data.attributes;
  
        commit('SET_CURRENT_USER', user);
        dispatch('loadPlayedVideos', user.id);
        return user;
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
