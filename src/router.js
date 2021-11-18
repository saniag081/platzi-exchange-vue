import Vue from 'vue'
import Router from 'vue-router'

import Home from '@/views/Home'
import About from '@/views/About'
import Error from '@/views/Error'

Vue.use(Router)

export default new Router({
    mode: 'history',

    routes: [
        {
            path: '/',
            name: 'Home',
            component: Home
        },
        {
            path: '/about',
            name: 'About',
            component: About
        },
        {
            path: '*',
            name: '404',
            component: Error
        }
    ]
})