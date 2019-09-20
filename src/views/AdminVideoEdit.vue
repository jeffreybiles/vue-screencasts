<template>
  <v-container>
    <VideoEditForm :video="video" :saveVideo="saveVideo" buttonText="Save Video" />
  </v-container>
</template>

<script>
  import { mapState } from 'vuex';
  import VideoEditForm from '@/components/VideoEditForm.vue';

  export default {
    components: {
      VideoEditForm,
    },
    computed: {
      ...mapState(['videos']),
      video(){
        return this.videos.find(v => v.id == this.$route.params.id) || {};
      }
    },
    methods: {
      async saveVideo() {
        await this.$store.dispatch('editVideo', this.video);
        this.$router.push({name: 'admin-video-list'});
      },
    },
  }
</script>

<style lang="scss" scoped>

</style>