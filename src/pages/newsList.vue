<template>
  <transition-group name="mylist">
    <div v-if="store.isLoading1" class="load">Загрузка новостей...</div>
    <div v-else class="news-list">
      <div
          class="news"
          v-for="news in store.newsList"
          :key="news.id"
          @click="$router.push({ name: 'news', params: { id: news.id}})"
      >
        <table class="table">
          <tbody>
            <tr>
              <td class="tableName" colspan="2">
                {{news.title}}
              </td>
            </tr>
            <tr>
              <td class="tableRating">
                #{{news.score}}
              </td>
              <td class="tableTimeAuthor">
                {{ news.time }} by {{news.by}}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </transition-group>
</template>

<script>
import {useNewsStore} from "../stores/NewsStore"

export default {
  data: function () {
    return {
      store: useNewsStore(),
      isLoading: true,
    }
  },

  methods: {
    fetchNews() {
      this.store.fetchNewsList()
    },
    startAutoRefresh() {
      this.fetchNews();
      this.refreshInterval = setInterval(() => {
        this.fetchNews();
      }, 60000);
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
.mylist-move,
.mylist-enter-active,
.mylist-leave-active {
  transition: all 1s ease;
}

.mylist-enter-from,
.mylist-leave-to {
  opacity: 0;
  transform: translateY(30px);
}

.mylist-leave-active {
  position: absolute;
}

.news-list {
  display: flex;
  flex-wrap: wrap;
  align-content: start;
  gap: 10px;
}

.load {
  font-family: 'Inter', sans-serif;

}

.news {
  flex: 1 1 calc(25% - 10px);
  min-width: calc(25% - 10px);
  height: 70px;
  background: #2e2f30;
  border: 1px solid black;
  box-shadow: 0px 0px 10px black;
  border-radius: 3px;
  padding: 5px;
  font-family: 'Inter', sans-serif;
}

.table {
  height: 100%;
  width: 100%;
}

.tableName {
  width: 100%;
  text-align: left;
  vertical-align: top;
}

.tableRating {
  text-align: left;
  vertical-align: bottom;
}

.tableTimeAuthor {
  font-size: 13px;
  color: gray;
  text-align: right;
  vertical-align: bottom;
}

.news:hover {
  background: #212223;
}
</style>