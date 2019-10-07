<template>
  <div>
    <h1 class="display-3 ma-4 d-flex justify-center">
      Videos with Tag "{{ tag.name }}"
    </h1>

    <div class="d-flex flex-wrap">
      <div v-for="video in videosOnTag" :key="video.id">
        <VideoListVideo :video="video"></VideoListVideo>
      </div>
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
    ...mapState({
      videos: state => state.videos.videos
    }),
    ...mapGetters({
      getTag: 'tags/get'
    }),
    tag(){
      return this.getTag(this.$route.params.id)
    },
    videosOnTag(){
      return this.videos.filter(v => this.tag.video_ids.includes(v.id.toString()))
    }
  }  
}
</script>