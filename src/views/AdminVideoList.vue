<template>
  <v-container>
    <div>
      <div class="flex-table">
        <td>Name</td>
        <td>Description</td>
        <td>Actions</td>
      </div>
      <template v-for="video in videos">
        <div :key="video.id" class="flex-table">
          <div>
            {{video.name}}
          </div>
          <div>
            {{video.description | abbreviate(50)}}
          </div>
          <div class="actions">
            <router-link :to="{name: 'video-watch', params: {id: video.id}}">Show</router-link>
            <span>Edit</span>
            <span @click="destroy(video)">Delete</span>
          </div>
        </div>
      </template>
    </div>
  </v-container>
</template>

<script>
  import { mapState } from 'vuex'

  export default {
    computed: {
      ...mapState(['videos']),
    },
    filters: {
      abbreviate(text, amount) {
        if(text){
          text = text.replace('<p>', '');
          return text.slice(0, amount);
        }
      }
    },
    methods: {
      destroy(video) {
        this.$store.dispatch('destroyVideo', video);
      }
    },
  }
</script>

<style lang="scss" scoped>

.flex-table {
  display: grid;
  grid-template-columns: repeat(auto-fill, 33%);
  border-bottom: 1px solid black;
  padding: 5px 0;

  &:nth-of-type(2n){
    background-color: #dedede;
  }
}

.actions {
  * {
    padding-right: 10px;
  }
}
</style>