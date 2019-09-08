<template>
  <div class="home">
    <h1>Videos</h1>
    <div class="video-container">
      <div v-for="video in videos" :key="video.id">
        <div class="video-box">
          <img :src="video.thumbnail" />
          <div>
            <h3>{{ video.name }}</h3>
            <div v-html="video.description"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
export default {
  name: "home",
  components: {},
  data() {
    return {
      videos: this.$store.state.videos,
    }
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