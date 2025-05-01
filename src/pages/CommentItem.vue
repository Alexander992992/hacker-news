<template>
  <div class="comment">
    <div class="comment-header" @click="toggleChildren">
      <span class="comment-author">{{ comment.by }}</span>
      <span v-if="hasChildren">{{ showChildren ? '-' : '+' }}</span>
    </div>
    <div class="comment-text" v-html="comment.text" @click="toggleChildren"></div>
    <div class="comment-children" v-if="showChildren && hasChildren">
      <div v-if="loadingChildren">Загрузка...</div>
      <comment-item
          v-else
          v-for="child in childComments"
          :key="child.id"
          :comment="child"
      />
    </div>
  </div>
</template>

<script>
import { useNewsStore } from "@/stores/NewsStore";

export default {
  name: 'CommentItem',
  props: {
    comment: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      showChildren: false,
      childComments: [],
      loadingChildren: false
    }
  },
  computed: {
    hasChildren() {
      return this.comment.kids && this.comment.kids.length > 0;
    }
  },
  methods: {
    async toggleChildren() {
      if (!this.hasChildren) return;
      this.showChildren = !this.showChildren;
      if (this.showChildren && this.childComments.length === 0) {
        this.loadingChildren = true;
        try {
          const store = useNewsStore();
          this.childComments = await store.fetchComments(this.comment.kids);
        } finally {
          this.loadingChildren = false;
        }
      }
    }
  }
}
</script>

<style scoped>
.comment {
  background: #2e2f30;
  border: 1px solid black;
  box-shadow: 0px 0px 10px black;
  border-radius: 3px;
  padding: 10px;
  margin-top: 5px;
}

.comment-header {
  display: flex;
  gap: 10px;
  margin-bottom: 5px;
}

.comment-author {
  color: #4d9eff;
  font-weight: bold;
}

.comment-text {
  margin-top: 5px;
  line-height: 1.4;
}

.comment-children {
  margin-top: 10px;
  border-left: 2px solid #444;
  padding-left: 10px;
}
</style>