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
                        @blur="saveTagEdits(tag)"
                        @keydown.enter="saveTagEdits(tag)"/>
        </div>
        <div v-else @click="editTag(tag)">
          {{ tag.name }}
        </div>
      </div>
      <div>
        <router-link :to="{name: 'tag', params: {id: tag.id }}"> 
          {{ tag.video_ids.length }}
        </router-link>
      </div>
      <div class="actions">
        <v-btn x-small @click="editTag(tag)">Edit</v-btn>
        <v-btn x-small @click="deleteTag(tag)">Delete</v-btn>
      </div>
    </div>
    <div v-if="!editingNewTag">
      <v-btn class="mt-3" @click="startNewTag()">New Tag</v-btn>
    </div>
    <div v-else class="flex-table">
      <div>
        <v-text-field v-model="newTagName"
                      id="new-tag-name"
                      @blur="saveNewTag()"
                      @keydown.enter="saveNewTag()" />
      </div>
      <div>Hit enter or tab to save; leave blank to cancel</div>
      <div></div>
    </div>
  </div>
</template>

<script>
  import { mapState, mapGetters } from 'vuex';
  export default {
    data() {
      return {
        editingTagId: '',
        editingNewTag: false,
        newTagName: ''
      }
    },
    computed: {
      ...mapState(['tags']),
      ...mapGetters(['getTag']),
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
        this.$store.dispatch('saveTagName', {tag})
        // TODO: Dispatch to store
        this.editingTagId = ''
      },
      startNewTag(){
        this.editingNewTag = true;
        setTimeout(()=>{
          document.getElementById(`new-tag-name`).focus();
        }, 1);
      },
      saveNewTag() {
        if(this.newTagName.length > 0) {
          this.$store.dispatch('createTag', {name: this.newTagName});
          this.newTagName = ''
        }
        this.editingNewTag = false
      },
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