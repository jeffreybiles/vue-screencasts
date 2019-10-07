<template>
  <v-container>
    <h1>Login</h1>
    <UserAuthForm :submitForm="loginUser" buttonText="Login" />
  </v-container>
</template>

<script>
  import UserAuthForm from "@/components/UserAuthForm";

  export default {
    components: {
      UserAuthForm
    },
    methods: {
      async loginUser(loginInfo) {
        let user = await this.$store.dispatch('users/login', loginInfo);
        if(user.error){
          this.$store.dispatch('snackbar/setSnackbar', {color: 'error', text: user.error});
        } else {
          this.$store.dispatch('snackbar/setSnackbar', {text: 'Thank you for signing in, ' + user.name});
          if(user.admin){
            this.$router.push('/admin/videos');
          } else {
            this.$router.push('/');
          }
        }
      }
    },
  }
</script>

<style lang="scss" scoped>

</style>