<template>
  <div v-if="store.isLoading2" class="news">Загрузка...</div>
  <div v-else class="news">
    <div>
      <h1 class="title">{{ info.title }}</h1>
    </div>
    <div>
      <a :href="info.url" target="_blank" rel="noopener noreferrer" class="url">{{ info.url }}</a>
    </div>
    <div class="timeby">
      {{ info.time }} by {{ info.by }}
    </div>
    <div class="descendants" @click="refreshComments">
      Комментарии ({{ info.descendants }})
      <div v-if="isRefreshing">Обновление...</div>
    </div>
    <div class="comments-container">
      <comment-item
          v-for="comment in comments"
          :key="comment.id"
          :comment="comment"
      />
    </div>
  </div>
</template>

<script>
import { useNewsStore } from "@/stores/NewsStore";
import { useRoute } from 'vue-router';
import { ref } from 'vue';
import CommentItem from '@/pages/CommentItem.vue';

export default {
  components: {
    CommentItem
  },
  data() {
    const route = useRoute();
    return {
      store: useNewsStore(),
      info: {},
      idNews: route.params.id,
      comments: ref([]),
      refreshInterval: null,
      isRefreshing: false
    }
  },
  methods: {
    async fetchInfo() {
      this.info = await this.store.fetchNewsInfo(this.idNews);
      await this.fetchComments();
    },
    async fetchComments() {
      if (this.info.kids) {
        this.comments = await this.store.fetchComments(this.info.kids);
      }
    },
    startAutoRefresh() {
      this.fetchInfo();
      this.refreshInterval = setInterval(() => {
        this.fetchComments();
      }, 60000);
    },
    async refreshComments() {
      this.isRefreshing = true;
      try {
        await this.fetchComments();
      } finally {
        this.isRefreshing = false;
      }
    }
  },
  async mounted() {
    this.startAutoRefresh();
  },
  beforeUnmount() {
    if (this.refreshInterval) {
      clearInterval(this.refreshInterval);
    }
  }
}
</script>

<style scoped>
.news {
  font-size: 20px;
  font-family: 'Inter', sans-serif;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.title {
  text-align: center;
  font-size: 30px;
}

.url {
  all: unset;
}

.comments-container {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.descendants {
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
}

.descendants:hover {
  color: #9a9e9a;
}

</style>