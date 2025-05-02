import { createRouter, createWebHistory } from 'vue-router'
import Register from '../components/Register.vue'
import Login from '../components/Login.vue'
import ProductList from '../components/ProductList.vue'
import ProductForm from '../components/ProductForm.vue'

const routes = [
  { path: '/register', component: Register },
  { path: '/login', component: Login },
  { path: '/products', component: ProductList, meta: { requiresAuth: true } },
  { path: '/products/new', component: ProductForm, meta: { requiresAuth: true } },
  { path: '/products/edit/:id', component: ProductForm, meta: { requiresAuth: true } }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// Protect routes: redirect to login if not authenticated
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')
  if (to.meta.requiresAuth && !token) {
    return next('/login')
  }
  // Prevent logged-in users from visiting login/register
  if ((to.path === '/login' || to.path === '/register') && token) {
    return next('/products')
  }
  next()
})

export default router
