<template>
  <div>
    <div class="d-flex justify-center display-3 ma-4">Videos with Tag "{{ tag.name }}"</div>
    <div class="d-flex flex-wrap">
      <VideoListVideo :video="video" v-for="video in videosOnTag" :key="`tag-${video.id}`" class="ma-2" />
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