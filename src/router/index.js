import {createRouter, createWebHistory} from 'vue-router'

import newsList from '../pages/newsList'
import newsPage from '../pages/newsPage'

export default createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'list',
            component: newsList,
        },
        {
            path: '/:id',
            name: 'news',
            component: newsPage,
        },
    ]
})