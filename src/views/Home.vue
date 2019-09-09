<template>
  <div class="home">
    <h1>Videos</h1>
    <div v-for="tag in tags" :key="tag">
      {{ tag.name }}
    </div>
    <div class="video-container">
      <div v-for="video in videos" :key="video.name">
        <router-link :to="{ name: 'video-watch', params: { id: video.id }}">
          <div class="video-box">
            <img :src="video.thumbnail" />
            <div>
              <h3>{{ video.name }}</h3>
              <div v-html="video.description"></div>
            </div>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
  name: "home",
  components: {},
  methods: {},
  computed: {
    ...mapState(['videos', 'tags'])
  }
};
</script>

<style scoped lang="scss">
  .video-container {
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
  }
</style>