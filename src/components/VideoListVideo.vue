<template>
  <v-card width="340px" 
          hover 
          class="ma-2"
          :to="{ name: 'video-watch', params: { id: video.id }}">
    <v-img :src="video.thumbnail" />
    <v-card-title>{{ video.name }}</v-card-title>
    <v-card-text>
      <div class="green--text" v-if="isPlayed">
        <font-awesome-icon icon="check" /> Played
      </div>
    </v-card-text>

    <v-card-actions>
      <span v-for="tag_id in video.tag_ids" :key="`${video.id}-${tag_id}`">
        <v-btn color="green lighten-2" 
               class="mr-2"
               small
               @mousedown.stop
               :to="{ name: 'tag', params: {id: tag_id}}">
          {{ getTag(tag_id).name }}
        </v-btn>
      </span>
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapGetters, mapState } from 'vuex';
export default {
  computed: {
    ...mapGetters(['getTag']),
    ...mapState(['playedVideos']),
    isPlayed(){
      return this.playedVideos.includes(this.video.id)
    }
  },
  props: ['video'],
  
}
</script>

<style scoped lang="scss">
</style>