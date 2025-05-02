<script setup> 
import { computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()
const isAuthenticated = computed(() => !!localStorage.getItem('token'))

const logout = () => {
  localStorage.removeItem('token')
  router.push('/login')
}

const showNav = computed(() => {
  return !["/login", "/register"].includes(route.path)
})
</script>

<template>
  <nav v-if="showNav" class="main-nav">
    <router-link v-if="!isAuthenticated" to="/register">S’inscrire</router-link>
    <router-link v-if="!isAuthenticated" to="/login">Se connecter</router-link>
    <router-link v-if="isAuthenticated" to="/products">Produits</router-link>
    <button v-if="isAuthenticated" @click="logout" class="nav-btn">Déconnexion</button>
  </nav>

  <transition name="fade" mode="out-in">
    <router-view />
  </transition>
</template>


<style scoped>
.main-nav {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
  background-color: #1e1e2f;
  padding: 1rem 2rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  border-bottom: 2px solid #333;
  font-family: 'Segoe UI', sans-serif;
}

.main-nav a,
.nav-btn {
  font-weight: 600;
  font-size: 1rem;
  padding: 0.6rem 1.2rem;
  text-decoration: none;
  color: #eee;
  border-radius: 6px;
  transition: background-color 0.3s ease, color 0.3s ease;
}

.main-nav a:hover,
.nav-btn:hover {
  background-color: #4f46e5;
  color: #fff;
}

.main-nav a.router-link-active {
  background-color: #4f46e5;
  color: #fff;
}

.nav-btn {
  background-color: transparent;
  border: 1px solid #ccc;
  cursor: pointer;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Responsive */
@media (max-width: 600px) {
  .main-nav {
    flex-direction: column;
    align-items: stretch;
  }

  .main-nav a,
  .nav-btn {
    width: 100%;
    text-align: center;
  }
}

.main-nav {
  display: flex;
  justify-content: center;
  gap: 1rem;
  background-color: var(--color-bg-alt);
  padding: 0.25rem 1rem 0.75rem 1rem; /* top right bottom left */
  border-bottom: 1px solid #444;
  margin-top: 0;
}

.main-nav a {
  padding: 0.5em 1em;
  text-decoration: none;
  color: inherit;
  border-radius: 4px;
  transition: background-color 0.3s, color 0.3s;
}

.main-nav a.router-link-active {
  background-color: var(--color-primary);
  color: #fff;
}

.nav-btn {
  background: none;
  border: none;
  color: inherit;
  padding: 0.5em 1em;
  cursor: pointer;
  border-radius: 4px;
  transition: background-color 0.3s, color 0.3s;
}

.nav-btn:hover {
  background-color: var(--color-primary);
  color: #fff;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

</style>

<style>
/* Style global (non scoped) */
body, html {
  margin: 0;
  padding: 0;
  overflow-y: hidden; /* désactive le scroll vertical */
  height: 100vh;
}
</style>
