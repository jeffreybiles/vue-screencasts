<template>
  <v-container>
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
          alert(user.error)
        } else {
          alert('Thank you for signing in, ' + user.name);
        }
      }
    },
  }
</script>

<style lang="scss" scoped>

</style>