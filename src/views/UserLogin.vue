<template>
  <v-container>
    <h1>Login</h1>
    <UserAuthForm :submitForm="loginUser" buttonText="Login" />

    <v-snackbar v-model="snackbar" :color="snackbarColor" :timeout="0">
      {{ snackbarText }}
      <v-btn text @click="snackbar = false">
        Close
      </v-btn>
    </v-snackbar>
  </v-container>
</template>

<script>
  import UserAuthForm from "@/components/UserAuthForm";

  export default {
    components: {
      UserAuthForm
    },
    data() {
      return {
        snackbar: true,
        snackbarText: "TESTING",
        snackbarColor: "",
      }
    },
    methods: {
      async loginUser(loginInfo) {
        let user = await this.$store.dispatch('loginUser', loginInfo);
        if(user.error){
          this.snackbarText = user.error;
          this.snackbar = true;
          this.snackbarColor = 'error';
        } else {
          this.snackbarText = 'Thank you for signing in, ' + user.name;
          this.snackbar = true;
          this.snackbarColor = 'success'
        }
      }
    },
  }
</script>

<style lang="scss" scoped>

</style>