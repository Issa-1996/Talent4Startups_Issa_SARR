<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import api from '../services/api'

const route = useRoute()
const router = useRouter()
const id = route.params.id

const name = ref('')
const description = ref('')
const price = ref(0)
const loading = ref(false)

const fetchProduct = async () => {
  if (id) {
    loading.value = true
    try {
      const res = await api.get(`/products/${id}`)
      name.value = res.data.name
      description.value = res.data.description
      price.value = res.data.price
    } catch (error) {
      alert("Erreur lors du chargement du produit.")
    } finally {
      loading.value = false
    }
  }
}

onMounted(fetchProduct)

const submit = async () => {
  try {
    loading.value = true
    const data = {
      name: name.value.trim(),
      description: description.value.trim(),
      price: price.value
    }
    if (!data.name || !data.price) {
      alert('Veuillez remplir les champs obligatoires.')
      return
    }
    if (id) {
      await api.put(`/products/${id}`, data)
      alert('Produit modifié avec succès')
    } else {
      await api.post('/products', data)
      alert('Produit ajouté avec succès')
    }
    router.push('/products')
  } catch (err) {
    alert(err.response?.data?.error || 'Erreur lors de l\'enregistrement du produit')
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="form-wrapper">
    <h2>{{ id ? '✏️ Modifier le produit' : '➕ Ajouter un produit' }}</h2>

    <form @submit.prevent="submit" class="product-form">
      <div class="form-group">
        <label for="name">Nom *</label>
        <input id="name" v-model="name" required placeholder="Nom du produit" />
      </div>

      <div class="form-group">
        <label for="description">Description</label>
        <textarea id="description" v-model="description" rows="4" placeholder="Description du produit"></textarea>
      </div>

      <div class="form-group">
        <label for="price">Prix *</label>
        <input
          id="price"
          type="number"
          step="0.01"
          min="0"
          v-model.number="price"
          required
          placeholder="Prix en $"
        />
      </div>

      <button type="submit" class="submit-btn" :disabled="loading">
        {{ loading ? 'Enregistrement...' : (id ? 'Modifier' : 'Ajouter') }}
      </button>
    </form>
  </div>
</template>

<style scoped>
.form-wrapper {
  max-width: 700px;
  margin: 2rem auto;
  padding: 2rem;
  border-radius: 8px;
  background-color: white;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  font-family: 'Segoe UI', sans-serif;
}

h2 {
  margin-bottom: 1.5rem;
  font-weight: 600;
  text-align: center;
  color: #374151;
}

.product-form {
  display: flex;
  flex-direction: column;
}

.form-group {
  margin-bottom: 1.2rem;
  display: flex;
  flex-direction: column;
}

label {
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: #374151;
}

input,
textarea {
  padding: 0.6rem;
  border: 1px solid #d1d5db;
  border-radius: 4px;
  font-size: 1rem;
}

input:focus,
textarea:focus {
  border-color: #6366f1;
  outline: none;
}

.submit-btn {
  background-color: #4f46e5;
  color: white;
  padding: 0.8rem 1.2rem;
  border: none;
  border-radius: 6px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.submit-btn:hover {
  background-color: #4338ca;
}

.submit-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
</style>
