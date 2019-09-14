<template>
  <div>
    <div>
      <input type="text" v-model="firstInput" />
    </div>
    <div>You typed: {{ firstInput }}</div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        firstInput: ''
      }
    },
  }
</script>

<style lang="scss" scoped>
  input {
    background-color: white;
    border: 1px solid black;
  }
</style>