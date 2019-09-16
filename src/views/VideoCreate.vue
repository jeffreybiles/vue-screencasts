<template>
  <v-container>
    <v-row>
      <v-col md="3" cols="12">
        <h1>Video Create Page</h1>
        <div class="field">
          <label for="name">Name</label>
          <input type="text" id="name" v-model="video.name" />
        </div>
        <div class="field">
          <label for="description">Description</label>
          <input type="text" id="description" v-model="video.description" />
        </div>
        <div class="field">
          <label for="thumbnail">Thumbnail URL</label>
          <input type="text" id="thumbnail" v-model="video.thumbnail" />
        </div>
        <div class="field">
          <label for="videoUrl">Video URL</label>
          <input type="text" id="videoUrl" v-model="video.videoUrl" />
        </div>
        <v-btn>Create Video</v-btn>
      </v-col>
      <v-col md="9" cols="12">
        <VideoListVideo :video="video" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import VideoListVideo from '@/components/VideoListVideo';
  export default {
    data() {
      return {
        video: {}
      }
    },
    components: {
      VideoListVideo,
    },
  }
</script>

<style lang="scss" scoped>
.field {
  input {
    border: 1px solid black;
  }
  label {
    display: block;
  }
  padding-bottom: 10px;
}
  
</style>