// Oddiy autentifikatsiya (faqat o'rganish uchun, ma'lumotlar brauzerda saqlanadi)
const USERS_KEY = 'users'
const CURRENT_KEY = 'currentUser'

function getUsers() {
  try {
    return JSON.parse(localStorage.getItem(USERS_KEY)) || []
  } catch {
    return []
  }
}

export function register(username, password) {
  const name = username.trim()
  const users = getUsers()

  if (users.some((u) => u.username.toLowerCase() === name.toLowerCase())) {
    return { ok: false, message: 'Bu login band. Boshqa login tanlang.' }
  }

  users.push({ username: name, password })
  localStorage.setItem(USERS_KEY, JSON.stringify(users))
  return { ok: true }
}

export function login(username, password) {
  const name = username.trim()
  const user = getUsers().find(
    (u) => u.username.toLowerCase() === name.toLowerCase() && u.password === password
  )

  if (!user) return { ok: false, message: "Login yoki parol noto'g'ri." }

  localStorage.setItem(CURRENT_KEY, user.username)
  return { ok: true }
}

export function logout() {
  localStorage.removeItem(CURRENT_KEY)
}

export function currentUser() {
  return localStorage.getItem(CURRENT_KEY)
}

export function isLoggedIn() {
  return !!currentUser()
}
