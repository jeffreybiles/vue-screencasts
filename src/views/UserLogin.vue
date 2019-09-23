<template>
  <v-container>
    <v-form>
      <v-text-field v-model="loginInfo.email" label="Email" />
      <v-text-field v-model="loginInfo.password"
                    label="Password"
                    :type="showPassword ? 'text' : 'password'" 
                    :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                    @click:append="showPassword = !showPassword"
                    />

      <v-btn @click="loginUser">Login</v-btn>
    </v-form>
  </v-container>
</template>

<script>
  export default {
    data() {
      return {
        showPassword: true,
        loginInfo: {
          email: '',
          password: ''
        }
      }
    },
    methods: {
      async loginUser() {
        let user = await this.$store.dispatch('loginUser', this.loginInfo);
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