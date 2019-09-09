<template>
  <router-link :to="{ name: 'video-watch', params: { id: video.id }}">
    <div class="video-box">
      <img :src="video.thumbnail" />
      <div>
        <h3>{{ video.name }}</h3>
        <div v-html="video.description"></div>
        <button v-for="tag_id in video.tag_ids" :key="tag_id">
          {{ getTag(tag_id).name }}
        </button>
      </div>
    </div>
  </router-link>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
export default {
  name: 'video-list-video',
  computed: {
    ...mapState(['tags']),
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