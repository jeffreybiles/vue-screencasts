<template>
  <v-container>
    <h1>Register</h1>
    <UserAuthForm :submitForm="registerUser" buttonText="Register" hasName=true />
  </v-container>
</template>

<script>
  import UserAuthForm from '@/components/UserAuthForm.vue';
  export default {
    components: {
      UserAuthForm
    },
    methods: {
      async registerUser(registrationInfo){
        let user = await this.$store.dispatch('registerUser', registrationInfo);
        if(user.error){
          this.$store.dispatch('setSnackbar', {
            text: user.error,
            color: 'error',
            timeout: 0
          });
        } else {
          this.$store.dispatch('setSnackbar', {
            text: 'Welcome to our app, ' + user.name,
            color: 'success',
            timeout: "6000"
          });
        }
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>