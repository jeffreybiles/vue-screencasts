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
        let user = await this.$store.dispatch('loginUser', loginInfo);
        if(user.error){
          this.$store.dispatch('setSnackbar', {
            text: user.error,
            color: 'error',
            timeout: 0
          });
        } else {
          this.$store.dispatch('setSnackbar', {
            text: 'Thank you for signing in, ' + user.name,
            color: 'success',
            timeout: "6000"
          });
        }
      }
    },
  }
</script>

<style lang="scss" scoped>

</style>