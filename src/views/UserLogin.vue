<template>
  <v-container>
    <div v-if="currentUser.name">You're already signed in</div>
    <div v-else>
      <UserAuthForm :submitForm="loginUser" />
    </div>
  </v-container>
</template>

<script>
  import { mapState } from 'vuex';
  import validations from '@/utils/validations';
  import UserAuthForm from '@/components/UserAuthForm.vue';
  export default {
    components: {
      UserAuthForm
    },
    computed: {
      ...mapState(['currentUser'])
    },
    methods: {
      async loginUser(loginInfo){
        let response = await this.$store.dispatch('loginUser', loginInfo);
        if(response.error){
          alert(response.error)
        } else {
          alert("You're signed in.  Thanks!")
        }
      },
    }
  }
</script>

<style lang="scss" scoped>

</style>