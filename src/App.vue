<template>
  <v-app>
    <v-app-bar app color="green">
      <v-toolbar-title class="headline text-uppercase">
        <v-btn text to="/">Vue Screencasts</v-btn>
      </v-toolbar-title>
      <v-btn text to="/admin/videos">Admin</v-btn>
      <v-spacer></v-spacer>
      <div v-if="currentUser.name">
        {{currentUser.name}}
        <v-btn text @click="logout">Logout</v-btn>
      </div>
      <div v-else>
        <v-btn text to="/login">
          <span class="mr-2">Login</span>
        </v-btn>
      </div>
    </v-app-bar>

    <v-content>
      <router-view />
    </v-content>
  </v-app>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'App',
  mounted(){
    this.$store.dispatch('loadVideos');
  },
  components: {
  },
  computed: {
    ...mapState(['currentUser']),
  },
  methods: {
    logout() {
      this.$store.dispatch('logoutUser');
    }
  },
  data: () => ({
    //
  }),
};
</script>
