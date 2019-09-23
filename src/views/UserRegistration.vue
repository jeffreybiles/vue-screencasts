<template>
  <v-container>
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
          alert(user.error)
        } else {
          alert('Welcme to our app, ' + user.name);
        }
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>