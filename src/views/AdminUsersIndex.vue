<template>
  <div>
    <h1>Users Index</h1>
    <ul>
      <li v-for="user in users" :key="user.name">
        {{user.name}}
      </li>
    </ul>
  </div>
</template>

<script>
  import { mapState } from 'vuex';
  export default {
    mounted(){
      console.log("mounted")
      this.$store.dispatch('loadUsers');
    },
    computed: {
      ...mapState(['users'])
    }
  }
</script>

<style lang="scss" scoped>

</style>
