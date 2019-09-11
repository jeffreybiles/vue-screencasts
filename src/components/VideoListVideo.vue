<template>
  <v-card width="340px" hover>
    <v-card-title centered class="justify-center">
      <router-link :to="{ name: 'video-watch', params: { id: video.id }}">
        <div class="title">{{ video.name }}</div>
      </router-link>
    </v-card-title>
    <v-card-text>
      <router-link :to="{ name: 'video-watch', params: { id: video.id }}">
        <v-img :src="video.thumbnail" />
      </router-link>
    </v-card-text>
    <v-card-actions class="justify-center">
        <span v-for="tag_id in video.tag_ids" :key="`${video.id}-${tag_id}`">
          <v-btn rounded 
                  color="green lighten-2"
                  class="mr-2"
                  :to="{ name: 'tag', params: {id: tag_id}}">
            {{ getTag(tag_id).name }}
          </v-btn>
        </span>
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  computed: {
    ...mapGetters(['getTag'])
  },
  props: ['video']
}
</script>

<style scoped lang="scss">
  img {
    max-width: 100%;
    padding: 10px;
  }
  .v-card {
    width: 340px;
  }
</style>