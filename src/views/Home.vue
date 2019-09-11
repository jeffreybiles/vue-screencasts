<template>
  <div class="home">
    <div class="d-flex justify-center display-4 ma-4">All Videos</div>

    <div class="d-flex flex-wrap">
      <VideoListVideo :video="video" v-for="video in videos" :key="video.id" class="ma-2" />
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
</style>