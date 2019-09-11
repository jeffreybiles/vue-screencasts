<template>
  <div class="video-box">
    <router-link :to="{ name: 'video-watch', params: { id: video.id }}">
      <img :src="video.thumbnail" />
    </router-link>
    <div>
      <router-link :to="{ name: 'video-watch', params: { id: video.id }}">
        <h3>{{ video.name }}</h3>
      </router-link>
      <div v-html="video.description"></div>
        <span v-for="tag_id in video.tag_ids" :key="tag_id">
          <v-btn rounded 
                  color="green lighten-2"
                  class="mr-2"
                  :to="{ name: 'tag', params: {id: tag_id}}">
            {{ getTag(tag_id).name }}
          </v-btn>
        </span>
    </div>
  </div>
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
  .video-box {
      border: 1px solid black;
      border-radius: 10px;
      margin: 10px;
      padding: 10px;

      text-align: left;

      display: flex;
      justify-content: flex-start;

      img {
        width: 200px;
        padding: 10px;
      }
    }
</style>