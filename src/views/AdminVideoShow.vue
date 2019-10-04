<template>
  <v-container>
    <div class="display-1">{{video.name}}</div>
    <div v-html="video.description"></div>

    <v-autocomplete multiple
                    label="Tags"
                    item-text="name"
                    return-object
                    chips
                    deletable-chips
                    hide-selected
                    v-model="videoTags"
                    :items="tags">
    </v-autocomplete>
  </v-container>
</template>

<script>
  import { mapState, mapGetters } from 'vuex';
  import _ from 'lodash';

  export default {
    computed: {
      ...mapState(['videos', 'tags']),
      ...mapGetters(['getTag']),
      video(){
        return this.videos.find(v => v.id == this.$route.params.id) || {};
      },
      videoTags: {
        get(){
          let tag_ids = this.video.tag_ids;
          return tag_ids && tag_ids.map(id => this.getTag(id));
        },
        set(newVideoTags){
          let deletedItems = _.differenceBy(this.videoTags, newVideoTags, 'id');
          let addedItems = _.differenceBy(newVideoTags, this.videoTags, 'id');
          if(deletedItems.length > 0) {
            this.$store.dispatch('disconnectVideoTag', {tag: deletedItems[0], video: this.video})
          }
          if(addedItems.length > 0) {
            this.$store.dispatch('connectVideoTag', {tag: addedItems[0], video: this.video})
          }
        }
      }
    },
  }
</script>

<style lang="scss" scoped>

</style>