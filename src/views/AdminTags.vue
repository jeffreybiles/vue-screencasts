<template>
  <div>
    <div class="flex-table">
      <div>Name</div>
      <div># Videos</div>
      <div>Actions</div>
    </div>
    <div v-for="tag in tags" :key="tag.id" class="flex-table">
      <div>
        <div v-if="editingTagId == tag.id">
          <v-text-field v-model="tag.name" 
                        :id="`tag-edit-${tag.id}`"
                        @blur="saveTagEdits(tag)"/>
        </div>
        <div v-else @click="editTag(tag)">
          {{ tag.name }}
        </div>
      </div>
      <div>{{ tag.video_ids.length }}</div>
      <div class="actions">
        <v-btn x-small @click="editTag(tag)">Edit</v-btn>
        <v-btn x-small @click="deleteTag(tag)">Delete</v-btn>
      </div>
    </div>
    <div class="flex-table">

    </div>
  </div>
</template>

<script>
  import { mapState } from 'vuex';
  export default {
    created(){
      this.$store.dispatch('loadAllTags');
    },
    data() {
      return {
        editingTagId: ''
      }
    },
    computed: {
      ...mapState(['tags'])
    },
    methods: {
      deleteTag(tag) {
        // TODO: Dispatch to store
      },
      editTag(tag) {
        this.editingTagId = tag.id;
        setTimeout(()=>{
          document.getElementById(`tag-edit-${tag.id}`).focus();
        }, 1);
      },
      saveTagEdits(tag) {
        // TODO: Dispatch to store
        this.editingTagId = ''
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
        margin-right: 10px
      }
    }
  }
</style>