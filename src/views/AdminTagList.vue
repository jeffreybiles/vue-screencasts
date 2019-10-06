<template>
  <div>
    <div class="flex-table">
      <div>Name</div>
      <div># videos</div>
      <div></div>
    </div>
    <div v-for="tag in tags" :key="tag.id" class="flex-table">
      <div>
        <div v-if="tagEditingId == tag.id">
          <v-text-field v-model="tag.name"
                        :id="`tag-edit-${tag.id}`"
                        @blur="updateTagName(tag)"
                        @keydown.enter="updateTagName(tag)" />
        </div>
        <div v-else @click="setToEditing(tag)">
          {{tag.name}}
        </div>
      </div>
      <div>
        <router-link :to="{ name: 'tag', params: { id: tag.id }}">
          {{tag.video_ids.length}}
        </router-link>
      </div>
      <div>
        <v-btn x-small @click="setToEditing(tag)">Edit</v-btn>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
  export default {
    data() {
      return {
        tagEditingId: '2'
      }
    },
    computed: {
      ...mapState(['tags'])
    },
    methods: {
      setToEditing(tag) {
        this.tagEditingId = tag.id;

        setTimeout(()=> {
          document.getElementById(`tag-edit-${tag.id}`).focus()
        }, 1)
      },
      updateTagName(tag) {
        this.$store.dispatch('updateTagName', {tag})

        this.tagEditingId = ''
      }
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