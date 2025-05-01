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
    <div class="descendants">
      Комментарии ({{ info.descendants }}):
    </div>
    <div class="comments" v-for="comment in comments" :key="comment.id">
      {{ comment.text }}
    </div>
  </div>
</template>
<script>

import {useNewsStore} from "@/stores/NewsStore";
import { useRoute } from 'vue-router';
import { ref } from 'vue';

export default {
  data() {
    const route = useRoute();
    return {
      store: useNewsStore(),
      info: {},
      idNews: route.params.id,
      comments: ref([])
    }
  },
  methods: {
    async fetchInfo() {
      this.info = await this.store.fetchNewsInfo(this.idNews);
      if (this.info.kids) {
        this.comments = await this.store.fetchComments(this.info.kids);
      }
    },
  },
  mounted() {
    this.fetchInfo()
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
  cursor: pointer;
}
.comments {
  background: #2e2f30;
  border: 1px solid black;
  box-shadow: 0px 0px 10px black;
  border-radius: 3px;
  padding: 5px;
}


</style>