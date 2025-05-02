import { ref } from 'vue';

// Reactive auth state based on localStorage
const isAuthenticated = ref(!!localStorage.getItem('token'));

function setToken(token) {
  localStorage.setItem('token', token);
  isAuthenticated.value = true;
}

function clearToken() {
  localStorage.removeItem('token');
  isAuthenticated.value = false;
}

export { isAuthenticated, setToken, clearToken };
