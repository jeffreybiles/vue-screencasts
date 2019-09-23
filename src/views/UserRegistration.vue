<template>
  <v-container>
    <UserAuthForm :submitForm="registerUser" buttonText="Register" hasName="true" />
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
        let response = this.$store.dispatch('registerUser', registrationInfo);
        if(response.error){
          alert(respons.error)
        } else {
          alert("Thank you for registering!")
        }
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>