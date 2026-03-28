import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Dashboard',
    component: () => import('../views/Dashboard.vue')
  },
  {
    path: '/decision',
    name: 'Decision',
    component: () => import('../views/DecisionScreen.vue')
  },
  {
    path: '/recovery',
    name: 'Recovery',
    component: () => import('../views/RecoveryScreen.vue')
  },
  {
    path: '/history',
    name: 'History',
    component: () => import('../views/HistoryScreen.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
