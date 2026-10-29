<script setup>
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { login } from '../auth'

const router = useRouter()
const route = useRoute()

const username = ref('')
const password = ref('')
const error = ref('')
const justRegistered = route.query.registered === '1'

function submit() {
  const result = login(username.value, password.value)
  if (!result.ok) {
    error.value = result.message
    password.value = ''
    return
  }
  router.push({ name: 'home' })
}
</script>

<template>
  <main class="wrap">
    <form class="card" @submit.prevent="submit">
      <h1>Kirish</h1>
      <p class="hint">Login va parolingizni kiriting</p>

      <p v-if="justRegistered && !error" class="success" role="status">
        Ro'yxatdan o'tdingiz. Endi kiring.
      </p>

      <label for="u">Login</label>
      <input id="u" v-model="username" type="text" autocomplete="username" autofocus @input="error = ''" />

      <label for="p">Parol</label>
      <input id="p" v-model="password" type="password" autocomplete="current-password" @input="error = ''" />

      <p v-if="error" class="error" role="alert">{{ error }}</p>

      <button type="submit" :disabled="!username || !password">Kirish</button>

      <p class="switch">
        Hisobingiz yo'qmi?
        <router-link :to="{ name: 'register' }">Ro'yxatdan o'tish</router-link>
      </p>
    </form>
  </main>
</template>

<style scoped>
.wrap { min-height: 100vh; display: grid; place-items: center; padding: 1rem; }
.card {
  width: 100%;
  max-width: 360px;
  background: #fff;
  padding: 2rem;
  border-radius: 14px;
  box-shadow: 0 8px 30px rgba(20, 30, 60, 0.1);
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
h1 { margin: 0; font-size: 1.6rem; }
.hint { margin: 0 0 1rem; color: #6b7487; }
label { font-size: 0.9rem; font-weight: 600; }
input {
  padding: 0.75rem 0.9rem;
  font-size: 1rem;
  border: 1.5px solid #d3d9e5;
  border-radius: 8px;
}
input:focus { outline: 2px solid #3b6cf6; border-color: #3b6cf6; }
.error { margin: 0; color: #c62828; font-size: 0.9rem; }
.success { margin: 0; color: #2e7d32; font-size: 0.9rem; }
button {
  margin-top: 0.75rem;
  padding: 0.8rem;
  font-size: 1rem;
  font-weight: 600;
  color: #fff;
  background: #3b6cf6;
  border: 0;
  border-radius: 8px;
  cursor: pointer;
}
button:disabled { background: #a9b9ee; cursor: not-allowed; }
button:not(:disabled):hover { background: #2f58cf; }
.switch { margin: 0.75rem 0 0; text-align: center; font-size: 0.9rem; color: #6b7487; }
.switch a { color: #3b6cf6; font-weight: 600; }
</style>