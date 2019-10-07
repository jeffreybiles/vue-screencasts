<template>
  <div class="home">
    <div class="display-4 ma-4 d-flex justify-center">
      All Videos
    </div>

    <div class="d-flex flex-wrap">
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
import {mapState} from 'vuex';

export default {
  name: "home",
  components: {
    VideoListVideo
  },
  mounted(){
    this.$store.dispatch('loadVideos');
  },
  computed: {
    ...mapState({
      videos: state => state.videos.videos
    }),
  }
};
</script>

<style scoped lang="scss">
</style>