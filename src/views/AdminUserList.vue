<template>
  <div>
    <div v-for="user in users" :key="user.id">
      {{user.name}} <v-btn x-small @click="loginUser(user)">Login</v-btn>
    </div>
  </div>
</template>

<script>
  import { mapState } from 'vuex';

  export default {
    computed: {
      ...mapState({
        users: s => s.users.users
      })
    },
    mounted(){
      this.$store.dispatch("users/loadAll")
    },
    methods: {
      loginUser(user){
        this.$store.dispatch('users/login', user)
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>