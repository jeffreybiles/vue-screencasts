<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="9">
        <video-player class="video-player-box"
                      ref="videoPlayer"
                      :options="playerOptions">
        </video-player>
      </v-col>
      <v-col cols="12" md="3">
        <div class="display-1">{{video.name}}</div>
        <div v-html="video.description"></div>

        <span v-for="tag_id in video.tag_ids" :key="tag_id">
          <v-btn color="green lighten-2"
                  class="mr-2"
                  :to="{ name: 'tag', params: {id: tag_id}}">
            {{ getTag(tag_id).name }}
          </v-btn>
        </span>
      </v-col>
    </v-row>
  </v-container>
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
        autoplay: true,
        poster: this.video.thumbnail,
        fluid: true
      }
    }
  }
}
</script>

<style>
  .video-player-box .video-js {
    margin: auto;
  }

</style>