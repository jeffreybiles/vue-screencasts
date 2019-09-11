<template>
  <div>
    <h1>Videos with Tag "{{ tag.name }}"</h1>
    <div v-for="video in videosOnTag" :key="`tag-${video.id}`">
      <VideoListVideo :video="video"></VideoListVideo>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
import VideoListVideo from '@/components/VideoListVideo'

export default {
  components: {
    VideoListVideo
  },
  computed: {
    ...mapState(['videos']),
    ...mapGetters(['getTag']),
    tag(){
      return this.getTag(this.$route.params.id)
    },
    videosOnTag(){
      return this.videos.filter(v => this.tag.video_ids.includes(v.id.toString()))
    }
  }  
}
</script>