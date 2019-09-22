<template>
  <div>
    <h1>Users Index</h1>
    <ul>
      <li v-for="user in users" :key="user.name">
        {{user.name}} <v-btn x-small @click="signIn(user)">Sign In</v-btn>
      </li>
    </ul>
  </div>
</template>

<script>
  import { mapState } from 'vuex';
  export default {
    mounted(){
      this.$store.dispatch('loadUsers');
    },
    computed: {
      ...mapState(['users'])
    },
    methods: {
      signIn(user) {
        this.$store.dispatch('setCurrentUser', user);
      }
    },
  }
</script>

<style lang="scss" scoped>

</style>
