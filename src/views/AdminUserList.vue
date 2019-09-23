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
      ...mapState(['users'])
    },
    mounted(){
      this.$store.dispatch("loadUsers")
    },
    methods: {
      loginUser(user){
        this.$store.dispatch('loginUser', user)
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>