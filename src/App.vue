<template>
  <v-app>
    <v-app-bar app color="green">
      <v-toolbar-title class="headline text-uppercase">
        <v-btn text to="/">Vue Screencasts</v-btn>
      </v-toolbar-title>
      <v-btn text to="/admin/videos" v-if="currentUser.admin">Admin</v-btn>
      <v-spacer></v-spacer>
      <div v-if="currentUser.name">
        {{ currentUser.name }}
        <v-btn text class="mr-2" @click="logoutUser">Logout</v-btn>
      </div>
      <div v-else>
        <v-btn text class="mr-2" to="/login">Login</v-btn>
        <v-btn text class="mr-2" to="/registration">Register</v-btn>
      </div>
    </v-app-bar>

    <v-content>
      <router-view />
    </v-content>

    <v-snackbar
      v-for="(snackbar, index) in snackbars.filter(s => s.showing)"
      :key="snackbar.text + Math.random()"
      v-model="snackbar.showing"
      :timeout="snackbar.timeout"
      :color="snackbar.color"
      :style="`bottom: ${(index * 60) + 8}px`"
    >
      {{snackbar.text}}

      <v-btn text @click="snackbar.showing = false">
        Close
      </v-btn>
    </v-snackbar>
  </v-app>
</template>

<script>
import { mapState } from 'vuex';
export default {
  name: 'App',
  created(){
    this.$store.dispatch('videos/loadAll');
    this.$store.dispatch('loadCurrentUser');
    this.$store.dispatch('tags/loadAll');
  },
  components: {
  },
  computed: {
    ...mapState({
      currentUser: 'currentUser', 
      snackbars: state => state.snackbar.snackbars
    })
  },
  data: () => ({
    //
  }),
  methods: {
    logoutUser() {
      this.$store.dispatch("logoutUser");
    }
  },
};
</script>
