<template>
  <div>
    <h1>Videos tagged with "{{ tag.name }}"</h1>
    <div v-for="video in videosInTag" :key="video.id">
      <VideoListVideo :video="video"></VideoListVideo>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex';
import VideoListVideo from '@/components/VideoListVideo';

export default {
  components: {
    VideoListVideo
  },
  computed: {
    ...mapGetters(['getTag']),
    ...mapState(['videos']),
    tag(){
      return this.getTag(this.$route.params.id);
    },
    videosInTag(){
      if(this.tag){
        return this.videos.filter(v => this.tag.video_ids.includes(v.id.toString()))
      } else {
        return []
      }
    }
  },
}
</script>