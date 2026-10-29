<script setup>
import { useRouter } from 'vue-router'
import { currentUser, logout } from '../auth'

const router = useRouter()
const username = currentUser()

function exit() {
  logout()
  router.push({ name: 'login' })
}
</script>

<template>
  <main class="wrap">
    <header>
      <h1>Asosiy sahifa</h1>
      <button @click="exit">Chiqish</button>
    </header>
    <p>Xush kelibsiz, <strong>{{ username }}</strong>! Siz muvaffaqiyatli kirdingiz.</p>
  </main>
</template>

<style scoped>
.wrap { max-width: 720px; margin: 0 auto; padding: 2rem 1rem; }
header { display: flex; justify-content: space-between; align-items: center; }
h1 { margin: 0; }
button {
  padding: 0.55rem 1rem;
  font-size: 0.95rem;
  border: 1.5px solid #d3d9e5;
  border-radius: 8px;
  background: #fff;
  cursor: pointer;
}
button:hover { background: #eef1f8; }
</style>