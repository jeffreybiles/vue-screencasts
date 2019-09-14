<template>
  <v-container>
    <v-row>
      <v-col sm="5" md="3" cols="12">
        <div class="field">
          <label for="name">Name</label>
          <input type="text" id="name" v-model="video.name" />
        </div>
        <div class="field">
          <label for="description">Description</label>
          <textarea id="description" v-model="video.description" />
        </div>
        <div class="field">
          <label for="thumbnail">Thumbnail URL</label>
          <input type="text" id="thumbnail" v-model="video.thumbnail">
        </div>
        <div class="field">
          <label for="videoUrl">Video URL</label>
          <input type="text" id="videoUrl" v-model="video.videoUrl">
        </div>
        <div class="field">
          <v-btn @click="createVideo">Create Video</v-btn>
        </div>
      </v-col>
      <v-col sm="7" md="9" cols="12">
        <VideoListVideo :video="video" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import VideoListVideo from '@/components/VideoListVideo.vue';
  export default {
    components: {
      VideoListVideo
    },
    data() {
      return {
        video: {}
      }
    },
    methods: {
      createVideo(){
        this.$store.dispatch('createVideo', this.video);
      }
    }
  }
</script>

<style lang="scss" scoped>

  .field {
    label {
      display: block;
      margin-bottom: 2px;
    }
    input, textarea {
      background-color: white;
      border: 1px solid black;
    }
    padding-bottom: 10px;
  }
</style>