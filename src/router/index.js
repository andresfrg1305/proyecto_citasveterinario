import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const routes = [
  {
    path: '/',
    redirect: '/login',
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/LoginView.vue'),
    meta: { requiresAuth: false },
  },
  {
    path: '/owner/dashboard',
    name: 'owner-dashboard',
    component: () => import('@/views/owner/DashboardView.vue'),
    meta: { requiresAuth: true, role: 'owner' },
  },
  {
    path: '/vet/dashboard',
    name: 'vet-dashboard',
    component: () => import('@/views/vet/DashboardView.vue'),
    meta: { requiresAuth: true, role: 'vet' },
  },
  {
    path: '/:pathMatch(.*)*',
    component: () => import('@/views/NotFound.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()

  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next('/login')
  } else if (to.meta.role && authStore.userRole !== to.meta.role) {
    next(authStore.userRole === 'vet' ? '/vet/dashboard' : '/owner/dashboard')
  } else {
    next()
  }
})

export default router
