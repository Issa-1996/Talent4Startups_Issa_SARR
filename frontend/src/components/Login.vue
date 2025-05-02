<script setup>
import { ref } from 'vue'
import api from '../services/api'
import { useRouter } from 'vue-router'

const email = ref('')
const password = ref('')
const router = useRouter()

const login = async () => {
  try {
    const response = await api.post('/auth/login', {
      email: email.value,
      password: password.value
    })
    localStorage.setItem('token', response.data.token)
    router.push('/products')
  } catch (err) {
    alert(err.response?.data?.error || 'Login failed')
  }
}
</script>

<template>
  <div>
    <form class="login-form" @submit.prevent="login">
      <h2>Connexion</h2>

      <div class="form-group">
        <label for="email">Email</label>
        <input 
          id="email" 
          type="email" 
          v-model="email" 
          required 
          placeholder="Votre email"
        />
      </div>

      <div class="form-group">
        <label for="password">Mot de passe</label>
        <input 
          id="password" 
          type="password" 
          v-model="password" 
          required 
          placeholder="Votre mot de passe"
        />
      </div>

      <button type="submit">Se connecter</button>
      <p class="register-link">
        <router-link to="/register">Pas encore inscrit ? Créer un compte</router-link>
      </p>
    </form>
  </div>
</template>

<style scoped>
.login-form {
  background: var(--color-bg);
  padding: 2.5rem;
  border-radius: 12px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  width: 100%;
  max-width: 400px;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

h2 {
  text-align: center;
  margin-bottom: 1.5rem;
  color: #333;
}

.form-group {
  margin-bottom: 1rem;
  display: flex;
  flex-direction: column;
}

label {
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: #555;
}

input {
  padding: 1rem;
  border: 1px solid var(--color-bg-alt);
  border-radius: 8px;
  font-size: 1rem;
  background: rgba(255, 255, 255, 0.05);
  color: var(--color-text);
  transition: all 0.3s;
  width: 100%;
}

input:focus {
  border-color: #007bff;
  outline: none;
}

button {
  width: 100%;
  padding: 1rem;
  background-color: var(--color-primary);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1.1rem;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s;
  margin-top: 1.5rem;
}

.register-link {
  margin-top: 1.5rem;
  text-align: center;
}

.register-link a {
  color: var(--color-primary);
  text-decoration: none;
  font-weight: 500;
  transition: color 0.3s;
}

.register-link a:hover {
  color: var(--color-primary-light);
  text-decoration: underline;
}

button:hover {
  background-color: #0056b3;
}
</style>
