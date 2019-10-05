<template>
  <div>
    <div class="display-1 pt-3">{{video.name}}</div>
    <div v-html="video.description"></div>

    <v-autocomplete :items="tags" 
                    item-text="name" 
                    v-model="videoTags" 
                    multiple
                    chips
                    deletable-chips
                    hide-selected
                    return-object>
    </v-autocomplete>
  </div>
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
        set(newTags) {
          let addedTags = _.differenceBy(newTags, this.videoTags, 'id');
          let removedTags = _.differenceBy(this.videoTags, newTags, 'id');
          
          if(addedTags.length > 0) {
            this.$store.dispatch('connectTagToVideo', {tag: addedTags[0], video: this.video})
          }
          if(removedTags.length > 0) {
            this.$store.dispatch('disconnectTagFromVideo', {tag: removedTags[0], video: this.video})
          }
        }
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>