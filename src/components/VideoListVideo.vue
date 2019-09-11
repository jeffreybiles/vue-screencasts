<template>
  <v-card width="340px" hover :to="{ name: 'video-watch', params: {id: video.id}}">
    <v-img :src="video.thumbnail" />
    <v-card-title>{{ video.name }}</v-card-title>

    <v-card-actions>
      <span v-for="tag_id in video.tag_ids" :key="`${video.id}-${tag_id}`">
        <v-chip label 
                color="green lighten-2"
                class="mr-2"
                :to="{ name: 'tag', params: {id: tag_id}}">
          {{ getTag(tag_id).name }}
        </v-chip>
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
  .tags {
    bottom: 10px;
    left: 5px;
    position: absolute;
  }
</style>