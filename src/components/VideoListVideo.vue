<template>
  <router-link :to="{ name: 'video-watch', params: { id: video.id }}">
    <div class="video-box">
      <img :src="video.thumbnail" />
      <div>
        <h3>{{ video.name }}</h3>
        <div v-html="video.description"></div>
          <span v-for="tag_id in video.tag_ids" :key="tag_id">
            <v-btn color="green lighten-2 mr-2" 
                   small
                   :to="{ name: 'tag', params: {id: tag_id}}">
              {{ getTag(tag_id).name }}
            </v-btn>
          </span>
      </div>
    </div>
  </router-link>
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