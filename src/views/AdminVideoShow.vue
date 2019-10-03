<template>
  <v-container>
    <div class="display-1">{{video.name}}</div>
    <div v-html="video.description"></div>

    <v-autocomplete multiple
                    label="Tags"
                    item-text="name"
                    v-model="videoTags"
                    :items="tags">
    </v-autocomplete>
  </v-container>
</template>

<script>
  import { mapState, mapGetters } from 'vuex';

  export default {
    computed: {
      ...mapState(['videos', 'tags']),
      ...mapGetters(['getTag']),
      video(){
        return this.videos.find(v => v.id == this.$route.params.id) || {};
      },
      videoTags(){
        let tag_ids = this.video.tag_ids;
        return tag_ids && tag_ids.map(id => this.getTag(id));
      }
    },

  }
</script>

<style lang="scss" scoped>

</style>