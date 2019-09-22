<template>
  <v-container>
    <div v-if="currentUser.name">You're already signed in</div>
    <div v-else>
      <v-form v-model="valid">
        <v-text-field v-model="loginInfo.email"
                      label="Email"
                      :rules="[required('email'), emailFormat()]" />

        <v-text-field :type="show ? 'text' : 'password'"
                      :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                      v-model="loginInfo.password"
                      @click:append="show = !show"
                      label="Password" 
                      :rules="[required('password'), minLength('password', 8)]" />

        <v-btn @click="loginUser" :disabled="!valid">Login</v-btn>
      </v-form>
    </div>
  </v-container>
</template>

<script>
  import { mapState } from 'vuex';
  import validations from '@/utils/validations';
  
  export default {
    computed: {
      ...mapState(['currentUser'])
    },
    data() {
      return {
        show: false,
        valid: false,
        loginInfo: {
          email: '',
          password: '',
        },
        ...validations
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
      },
    }
  }
</script>

<style lang="scss" scoped>

</style>