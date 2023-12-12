<script setup>
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

const router = useRouter()

const user = reactive({
  username: '',
  password: ''
})

async function login() {
  try {
    const response = await axios.post(import.meta.env.VITE_TOKEN_URL, user)
    const { access, refresh } = response.data

    localStorage.setItem('access', access)
    localStorage.setItem('refresh', refresh)

    router.push({ name: 'cozinha' })
  } catch (e) {
    alert('Algum erro')
  }
}
</script>
<template>
  <main>
    <div class="container__login__form">
      <img class="image" src="../assets/ifbucksLogo.png" alt="logo do site IFbucks" />

      <h1>Bem Vindo de volta!</h1>
      <div class="inputs">
        <input class="input" v-model="user.username" type="text" placeholder="usuário" />
        <input class="input" v-model="user.password" type="text" placeholder="senha" />
      </div>
      <div class="button">
        <button @click="login">entrar</button>
      </div>
    </div>
  </main>
</template>

<style scoped>
.container__login__form {
  font-weight: normal;
  display: flex;
  flex-direction: column;
  align-content: center;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 2em;
}
.inputs {
  display: flex;
  flex-direction: column;
  align-content: center;
  width: 100%;
  max-width: 600px;
  gap: 15px;
}
h1 {
  color: black;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
button {
  background-color: #8fb090;
  flex-shrink: 0;
  border-radius: 18px;
  font-family: 'Poppins', sans-serif;
  font-size: 25px;
  border: #8fb090;
  cursor: pointer;
  width: 100%;
  max-width: 600px;
  padding: 15px 100px 15px 100px;
  margin-top: 15px;
}
.input {
  max-width: 600px;
  width: 100%;
  padding: 20px;
  flex-shrink: 0;
  border-radius: 20px;
  background: #d9d9d9;
  border: none;
}
.image {
  width: 100%;
  max-width: 200px;
}
::placeholder {
  font-family: 'Poppins', sans-serif;
  padding: 5%;
}
input::-webkit-input-placeholder {
  font-size: 20px;
}
</style>
