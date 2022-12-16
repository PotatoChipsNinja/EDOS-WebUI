import { createRouter, createWebHistory } from 'vue-router'
import Home from '../components/Home.vue'
import Detail from '../components/Detail.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/detail/:text',
      name: 'detail',
      component: Detail
    }
  ]
})

export default router
