<template>
  <v-container>
    <v-text-field v-model="video.name" label="Name" counter=50 :rules="[required('name'), minLength('name', 5), maxLength('name', 50)]"/>
    <v-textarea v-model="video.description" label="Description" />
    <v-text-field v-model="video.thumbnail" label="Thumbnail URL" />
    <v-text-field v-model="video.videoUrl" 
                  label="Video URL" 
                  hint="If you want our friends in China to be able to watch this, please use Amazon S3 or similar instead of Youtube and Vimeo." />

    <v-btn @click="saveVideo">Save Video</v-btn>
  </v-container>
</template>

<script>
  import { mapState } from 'vuex';

  export default {
    computed: {
      ...mapState(['videos']),
      video(){
        return this.videos.find(v => v.id == this.$route.params.id);
      },
    },
    methods: {
      async saveVideo() {
        await this.$store.dispatch('editVideo', this.video);
        this.$router.push({name: 'admin-video-list'});
      },

      required(propertyName) {
        return v => v && v.length > 0 || `${propertyName} is required`
      },
      minLength(propertyName, minLength) {
        return v => v && v.length >= minLength || `${propertyName} must be longer than ${minLength} characters`
      },
      maxLength(propertyName, maxLength) {
        return v => v && v.length <= maxLength || `${propertyName} must be shorter than ${maxLength} characters`
      }
    },
  }
</script>

<style lang="scss" scoped>

</style>