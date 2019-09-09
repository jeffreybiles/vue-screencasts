<template>
  <div>
    <video-player class="video-player-box"
                  ref="videoPlayer"
                  :options="playerOptions">
    </video-player>
    <span v-for="tag_id in video.tag_ids" :key="tag_id">
      <router-link :to="{ name: 'tag', params: { id: tag_id }}">
        <button>
          {{ getTag(tag_id).name }}
        </button>
      </router-link>
    </span>
    <h1>{{video.name}}</h1>
    <div v-html="video.description"></div>
  </div>
</template>

<script>
import 'video.js/dist/video-js.css'
 
import { videoPlayer } from 'vue-video-player'
import { mapGetters } from 'vuex';

export default {
  components: {
    videoPlayer
  },
  computed: {
    video(){
      return this.$store.state.videos.find(vid => vid.id == this.$route.params.id) || {}
    },
    ...mapGetters(['getTag']),
    playerOptions(){
      return {
        language: 'en',
        playbackRates: [0.7, 1.0, 1.5, 2.0, 2.5, 3.0],
        sources: [{
          type: "video/mp4",
          src: this.video.videoUrl
        }],
        poster: this.video.thumbnail,
      }
    }
  }
}
</script>

<style>
  .video-player-box .video-js {
    margin: auto;
    height: 600px;
  }

</style>