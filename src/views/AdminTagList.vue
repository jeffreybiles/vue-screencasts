<template>
  <div>
    <div class="flex-table">
      <div>Name</div>
      <div># videos</div>
      <div></div>
    </div>
    <div v-for="tag in tags" :key="tag.id" class="flex-table">
      <div>{{tag.name}}</div>
      <div>
        <router-link :to="{ name: 'tag', params: { id: tag.id }}">
          {{tag.video_ids.length}}
        </router-link>
      </div>
      <div>
        <v-btn x-small>Do Something</v-btn>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
  export default {
    computed: {
      ...mapState(['tags'])
    }
  }
</script>

<style lang="scss" scoped>
  .flex-table {
    display: grid;
    grid-template-columns: repeat(auto-fill, 33%);
    padding: 10px;
    border-bottom: 1px black solid;

    &:nth-of-type(2n) {
      background-color: #dedede;
    }

    .actions {
      * {
        padding-right: 15px
      }
    }
  }
</style>