<template>
  <v-container>
    <v-row>
      <v-col sm="5" md="3" cols="12">
        <v-text-field label="Name" v-model="video.name" />
        <v-text-field label="Description" v-model="video.description" />
        <v-text-field label="Thumbnail URL" v-model="video.thumbnail" />
        <v-text-field label="Video URL" v-model="video.videoUrl" />
        <v-btn @click="createVideo">Create Video</v-btn>
      </v-col>
      <v-col sm="7" md="9" cols="12">
        <VideoListVideo :video="video" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import VideoListVideo from '@/components/VideoListVideo.vue';
  export default {
    components: {
      VideoListVideo
    },
    data() {
      return {
        video: {}
      }
    },
    methods: {
      async createVideo(){
        let savedVideo = await this.$store.dispatch('createVideo', this.video);
        this.$router.push({name: 'video-watch', params: {id: savedVideo.id}});
      }
    }
  }
</script>

<style lang="scss" scoped>
</style>