<template>
  <div>
    <div class="display-1 pt-3">{{video.name}}</div>
    <div v-html="video.description"></div>

    <v-combobox :items="tags" 
                    item-text="name" 
                    v-model="videoTags" 
                    multiple
                    chips
                    deletable-chips
                    hide-selected
                    return-object>
    </v-combobox>
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
        async set(newTags) {
          let createdTags = newTags.filter(t => typeof t == 'string')
          if (createdTags.length > 0) {
            let createdTag = await this.$store.dispatch('createTag', {name: createdTags[0]});
            this.$store.dispatch('connectTagToVideo', {tag: createdTag, video: this.video})
          } else {
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
  }
</script>

<style lang="scss" scoped>

</style>