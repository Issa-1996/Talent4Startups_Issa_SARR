<script setup>
import { ref, onMounted, computed } from 'vue'
import api from '../services/api'
import { useRouter } from 'vue-router'

const products = ref([])
const router = useRouter()

const itemsPerPage = 4
const currentPage = ref(1)

// Chargement des produits depuis l'API
const fetchProducts = async () => {
  try {
    const response = await api.get('/products')
    const payload = response.data
    products.value = Array.isArray(payload) ? payload : payload.products || []
    console.log('Products loaded:', products.value)

    // Si aucune page ou page invalide, revenir à la première
    if (currentPage.value > totalPages.value) {
      currentPage.value = 1
    }
  } catch (error) {
    console.error('Error fetching products:', error)
    alert('Erreur lors du chargement des produits')
  }
}

onMounted(fetchProducts)

// Pagination
const totalPages = computed(() => {
  return Math.max(1, Math.ceil(products.value.length / itemsPerPage))
})

const paginatedProducts = computed(() => {
  if (!products.value.length) return []
  const start = (currentPage.value - 1) * itemsPerPage
  return products.value.slice(start, start + itemsPerPage)
})

const nextPage = () => {
  if (currentPage.value < totalPages.value) currentPage.value++
}

const prevPage = () => {
  if (currentPage.value > 1) currentPage.value--
}

const editProduct = (id) => {
  router.push(`/products/edit/${id}`)
}

const deleteProduct = async (id) => {
  if (confirm('Supprimer ce produit ?')) {
    try {
      await api.delete(`/products/${id}`)
      fetchProducts()
    } catch (err) {
      alert("Échec de la suppression du produit.")
    }
  }
}
</script>

<template>
  <div class="product-list">
    <div class="header">
      <h2>📦 Liste des produits</h2>
      <button class="add-btn" @click="router.push('/products/new')">➕ Ajouter un produit</button>
    </div>

    <p v-if="!products.length" class="empty">Aucun produit à afficher.</p>

    <table v-else class="product-table">
      <thead>
        <tr>
          <th>Nom</th>
          <th>Prix</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="p in paginatedProducts" :key="p.id">
          <td>{{ p.name }}</td>
          <td>${{ Number(p.price).toFixed(2) }}</td>
          <td>
            <button class="edit-btn" @click="editProduct(p.id)">✏️ Modifier</button>
            <button class="delete-btn" @click="deleteProduct(p.id)">🗑️ Supprimer</button>
          </td>
        </tr>
      </tbody>
    </table>

    <div class="pagination" v-if="products.length > 0">
      <button @click="prevPage" :disabled="currentPage === 1">← Précédent</button>
      <span>Page {{ currentPage }} sur {{ totalPages }}</span>
      <button @click="nextPage" :disabled="currentPage === totalPages">Suivant →</button>
    </div>
  </div>
</template>

<style scoped>
.product-list {
  padding: 2rem;
  font-family: 'Segoe UI', sans-serif;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.add-btn {
  background-color: #4f46e5;
  color: white;
  padding: 0.6rem 1.2rem;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
  transition: background-color 0.3s ease;
}

.add-btn:hover {
  background-color: #3730a3;
}

.product-table {
  width: 100%;
  border-collapse: collapse;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.05);
  margin-top: 1rem;
}

.product-table th, .product-table td {
  padding: 1rem;
  text-align: left;
  border-bottom: 1px solid #e5e7eb;
}

.product-table tbody tr:hover {
  background-color: #f9fafb;
}

.edit-btn, .delete-btn {
  padding: 0.4rem 0.8rem;
  margin-right: 0.5rem;
  border: none;
  border-radius: 4px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.edit-btn {
  background-color: #10b981;
  color: white;
}

.edit-btn:hover {
  background-color: #059669;
}

.delete-btn {
  background-color: #ef4444;
  color: white;
}

.delete-btn:hover {
  background-color: #dc2626;
}

.pagination {
  margin-top: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
}

.pagination button {
  padding: 0.5rem 1rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  background-color: #f3f4f6;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.pagination button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.pagination button:hover:not(:disabled) {
  background-color: #e5e7eb;
}

.empty {
  margin-top: 2rem;
  text-align: center;
  color: #888;
}
</style>
