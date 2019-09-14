<template>
  <v-container>
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
  </v-container>
</template>

<script>
  export default {
    data() {
      return {
        video: {}
      }
    },
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