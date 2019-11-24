<template>
  <div class="home">
    <h1>Videos</h1>
    <div class="video-container">
      <div v-for="video in videos" :key="video.name">
        <VideoListVideo :video="video"></VideoListVideo>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Api from "@/services/api";
import VideoListVideo from '@/components/VideoListVideo';

export default {
  name: "home",
  components: {
    VideoListVideo
  },
  mounted(){
    this.$store.dispatch('loadVideos');
  },
  computed: {
    videos() {
      return this.$store.state.videos
    }
  },
};
</script>

<style scoped lang="scss">
  .video-container {}
</style>