<template>
  <v-container>
    <div v-if="currentUser.name">You're already signed in</div>
    <div v-else>
      <v-form>
        <v-text-field v-model="loginInfo.email" label="Email" />
        <v-text-field type="password" v-model="loginInfo.password" label="Password" />

        <v-btn @click="loginUser">Login</v-btn>
      </v-form>
    </div>
  </v-container>
</template>

<script>
  import { mapState } from 'vuex';

  export default {
    computed: {
      ...mapState(['currentUser'])
    },
    data() {
      return {
        loginInfo: {
          email: '',
          password: '',
        }
      }
    },
    methods: {
      async loginUser(){
        let response = await this.$store.dispatch('loginUser', this.loginInfo);
        if(response.error){
          alert(response.error)
        } else {
          alert("You're signed in.  Thanks!")
        }
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>