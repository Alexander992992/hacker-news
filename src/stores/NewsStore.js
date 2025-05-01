import { defineStore } from "pinia"
import axios from "axios"

export const useNewsStore = defineStore("newsStore", {
    state: () => ({
        newsList: [],
        ids: [],
        isLoading1: true,
        isLoading2: true,
        idLast: 0,
    }),
    actions: {
        async fetchNewsList() {
            const response = await axios.get('https://hacker-news.firebaseio.com/v0/maxitem.json');
            if (this.idLast != response.data) {
                this.idLast = response.data[0]
                this.isLoading1 = true
                try {
                    const response = await axios.get('https://hacker-news.firebaseio.com/v0/newstories.json');
                    this.ids = response.data.slice(0, 100);
                    this.newsList = await Promise.all(
                        this.ids.map(id => this.fetchNewsInfo(id))
                    );
                } finally {
                    this.isLoading1 = false
                }
            }
        },
        async fetchNewsInfo(id) {
            this.isLoading2 = true
            const response = await axios.get(`https://hacker-news.firebaseio.com/v0/item/${id}.json`);
            const date = new Date(response.data.time * 1000)
            const dateFormatted = date.toLocaleString('ru-RU').replace(/,/, '');
            this.isLoading2 = false
            return {
                id: response.data.id,
                title: response.data.title,
                score: response.data.score,
                time: dateFormatted,
                by: response.data.by,
                url: response.data.url,
                descendants: response.data.descendants,
                kids: response.data.kids
            }
        },
        async fetchCommentInfo(id) {
            const response = await axios.get(`https://hacker-news.firebaseio.com/v0/item/${id}.json`);
            return {
                id: response.data.id,
                text: response.data.text,
                kids: response.data.kids,
                by: response.data.by
            }
        },
        async fetchComments(ids) {
            return await Promise.all(
                ids.map(id => this.fetchCommentInfo(id))
            )
        }
    }
})
