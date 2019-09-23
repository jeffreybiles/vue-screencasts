<template>
  <v-form v-model="valid">
    <v-text-field v-model="loginInfo.name"
                  label="Name"
                  :rules="[required('name')]" 
                  v-if="hasName" />

    <v-text-field v-model="loginInfo.email"
                  label="Email"
                  :rules="[required('email'), emailFormat()]" />

    <v-text-field :type="show ? 'text' : 'password'"
                  :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                  v-model="loginInfo.password"
                  @click:append="show = !show"
                  label="Password" 
                  :rules="[required('password'), minLength('password', 8)]" />

    <v-btn @click="submitForm(loginInfo)" :disabled="!valid">{{ buttonText }}</v-btn>
  </v-form>
</template>

<script>
  import validations from '@/utils/validations';

  export default {
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
    props: ["submitForm", "buttonText", "hasName"]
  }
</script>

<style lang="scss" scoped>

</style>