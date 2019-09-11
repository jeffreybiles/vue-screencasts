<template>
  <div class="home">
    <h1 class="display-4 ma-4 d-flex justify-center">
      All Videos
    </h1>

    <div class="video-container">
      <div v-for="video in videos" :key="video.name">
        <VideoListVideo :video="video"></VideoListVideo>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import VideoListVideo from '@/components/VideoListVideo';

export default {
  name: "home",
  components: {
    VideoListVideo
  },
  methods: {},
  computed: {
    ...mapState(['videos']),
  }
};
</script>

<style scoped lang="scss">
  .video-container {
    
  }
</style>