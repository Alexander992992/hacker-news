<template>
  <header class="header">
    <img src="./image/y18.svg" class="icon" @click="$router.push({name: 'list'})">
    <span class="name" @click="$router.push({name: 'list'})">Hacker News</span>
    <img src="./image/update.svg" class="icon left" @click="fetchNews">
  </header>
</template>

<script>
import {useNewsStore} from "@/stores/NewsStore";
export default {
  data: function () {
    return {
      store: useNewsStore(),
    }
  },

  methods: {
    fetchNews() {
      this.store.fetchNewsList()
    }
  }
}
</script>

<style scoped>

.header {
  background: #FF6600;
  padding: 10px;
  display: flex;
  border-radius: 3px;
  border: 1px solid black;
  box-shadow: 0px 0px 10px black;
  margin-bottom: 10px;
}

.icon {
  border: 4px solid white;
  width: 45px;
  height: 45px;
  border-radius: 2px;
}

.left {
  margin-left: auto;
}

.name {
  margin-right: 10px;
  margin-left: 10px;
  font-family: 'Montserrat', sans-serif;
  font-weight: 700;
  font-size: 45px;
  color: #222222;
}

</style>