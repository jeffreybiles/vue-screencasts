<template>
  <v-app>
    <v-app-bar app color="green">
      <v-toolbar-title class="headline text-uppercase">
        <v-btn text to="/">Vue Screencasts</v-btn>
      </v-toolbar-title>
      <v-btn text to="/admin/videos">Admin</v-btn>
      <v-spacer></v-spacer>
      <v-btn text class="mr-2" to="/admin/users">Login</v-btn>
    </v-app-bar>

    <v-content>
      <router-view />
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: 'App',
  mounted(){
    this.$store.dispatch('loadVideos');
  },
  components: {
  },
  data: () => ({
    //
  }),
};
</script>
