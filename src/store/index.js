import Vue from "vue";
import Vuex from "vuex";
import snackbarModule from './snackbar';
import tagsModule from './tags';
import videosModule from './videos';
import usersModule from './users';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    snackbar: snackbarModule,
    tags: tagsModule,
    videos: videosModule,
    users: usersModule,
  },
});
