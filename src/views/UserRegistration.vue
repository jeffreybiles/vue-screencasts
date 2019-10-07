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
        let user = await this.$store.dispatch('users/register', registrationInfo);
        if(user.error){
          this.$store.dispatch('snackbar/setSnackbar', {color: 'error', text: user.error});
        } else {
          this.$store.dispatch('snackbar/setSnackbar', {text: 'Welcome to our app, ' + user.name});
          this.$router.push("/");
        }
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>