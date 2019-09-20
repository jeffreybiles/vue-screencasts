<template>
  <v-container>
    <v-form v-model="valid">
      <v-text-field v-model="video.name" 
                    label="Name" 
                    counter=50
                    :rules="[required('name'), minLength('name', 5), maxLength('name', 50)]" />
      <v-textarea v-model="video.description" 
                  label="Description" 
                  counter=true
                  :rules="[required('description'), minLength('description', 20)]"/>
      <v-text-field v-model="video.thumbnail" 
                    label="Thumbnail URL" 
                    :rules="[required('thumbnail URL')]" />
      <v-text-field v-model="video.videoUrl" 
                    label="Video URL" 
                    :rules="[required('video URL')]"
                    hint="If you want our friends in China to be able to watch this, please use Amazon S3 or similar instead of Youtube and Vimeo." />

      <v-btn @click="saveVideo" :disabled="!valid">Save Video</v-btn>
    </v-form>
  </v-container>
</template>

<script>
  import { mapState } from 'vuex';

  export default {
    data() {
      return {
        valid: false,
        required(propertyType) { 
          return v => v && v.length > 0 || `You must input a ${propertyType}`
        },
        minLength(propertyType, minLength) {
          return v => v && v.length >= minLength || `${propertyType} must be at least ${minLength} characters`
        },
        maxLength(propertyType, maxLength) {
          return v => v && v.length <= maxLength || `${propertyType} must be less than ${maxLength} characters`
        }
      }
    },
    computed: {
      ...mapState(['videos']),
      video(){
        return this.videos.find(v => v.id == this.$route.params.id) || {};
      }
    },
    methods: {
      async saveVideo() {
        await this.$store.dispatch('editVideo', this.video);
        this.$router.push({name: 'admin-video-list'});
      },
    },
  }
</script>

<style lang="scss" scoped>

</style>