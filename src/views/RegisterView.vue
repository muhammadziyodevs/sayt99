<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { register } from '../auth'

const router = useRouter()

const username = ref('')
const password = ref('')
const confirm = ref('')
const error = ref('')

function submit() {
  if (username.value.trim().length < 3) {
    error.value = "Login kamida 3 ta belgidan iborat bo'lsin."
    return
  }
  if (password.value.length < 6) {
    error.value = "Parol kamida 6 ta belgidan iborat bo'lsin."
    return
  }
  if (password.value !== confirm.value) {
    error.value = 'Parollar bir xil emas.'
    return
  }

  const result = register(username.value, password.value)
  if (!result.ok) {
    error.value = result.message
    return
  }

  // Ro'yxatdan o'tgach, kirish sahifasiga yo'naltiramiz
  router.push({ name: 'login', query: { registered: '1' } })
}
</script>

<template>
  <main class="wrap">
    <form class="card" @submit.prevent="submit">
      <h1>Ro'yxatdan o'tish</h1>
      <p class="hint">Yangi hisob yarating</p>

      <label for="u">Login</label>
      <input id="u" v-model="username" type="text" autocomplete="username" autofocus @input="error = ''" />

      <label for="p">Parol</label>
      <input id="p" v-model="password" type="password" autocomplete="new-password" @input="error = ''" />

      <label for="c">Parolni takrorlang</label>
      <input id="c" v-model="confirm" type="password" autocomplete="new-password" @input="error = ''" />

      <p v-if="error" class="error" role="alert">{{ error }}</p>

      <button type="submit">Ro'yxatdan o'tish</button>

      <p class="switch">
        Hisobingiz bormi?
        <router-link :to="{ name: 'login' }">Kirish</router-link>
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
button:hover { background: #2f58cf; }
.switch { margin: 0.75rem 0 0; text-align: center; font-size: 0.9rem; color: #6b7487; }
.switch a { color: #3b6cf6; font-weight: 600; }
</style>
