<script setup>
import { ref } from 'vue'
import api from '../services/api'
import { useRouter } from 'vue-router'

const username = ref('')
const email = ref('')
const password = ref('')
const router = useRouter()

const register = async () => {
  try {
    await api.post('/auth/register', {
      username: username.value,
      email: email.value,
      password: password.value
    })
    alert('Inscription réussie')
    router.push('/login')
  } catch (err) {
    alert(err.response?.data?.error || 'Erreur lors de l’inscription')
  }
}

const goToLogin = () => {
  router.push('/login')
}
</script>

<template>
  <div>
    <form class="register-form" @submit.prevent="register">
      <h2>Inscription</h2>

      <div class="form-group">
        <label>Nom d'utilisateur</label>
        <input v-model="username" required />
      </div>

      <div class="form-group">
        <label>Email</label>
        <input type="email" v-model="email" required />
      </div>

      <div class="form-group">
        <label>Mot de passe</label>
        <input type="password" v-model="password" required />
      </div>

      <button type="submit">S'inscrire</button>

      <p class="register-link">
        <router-link to="/login">Se connecter</router-link>
      </p>
    </form>
  </div>
</template>

<style scoped>
.register-form {
  background: #fff;
  padding: 2rem 2.5rem;
  border-radius: 8px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
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
  padding: 0.75rem 1rem;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 1rem;
  transition: border-color 0.3s;
}

input:focus {
  border-color: #28a745;
  outline: none;
}

button {
  width: 100%;
  padding: 0.75rem;
  background-color:blue;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #218838;
}

.login-link {
  margin-top: 1rem;
  text-align: center;
  color: #555;
}

.link-btn {
  background: none;
  border: none;
  color: #007bff;
  font-weight: 600;
  cursor: pointer;
  text-decoration: underline;
  margin-left: 0.3rem;
}

.link-btn:hover {
  color: #0056b3;
}
</style>
