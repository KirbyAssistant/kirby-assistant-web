import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Home from '@page/home/index.vue'

const routes: Array<RouteRecordRaw> = [
  { path: '/', name: 'home', component: Home },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router