<script setup>
</script>

<template>
  <main>
    <div class="container">
      <router-link to="/">
      <img class="image" src="../assets/ifbucksLogo.png" alt="logo do site IFbucks" />
      </router-link>
        
      <h1>Bem Vindo de volta!</h1>
      <div class="inputs">
        <input class="input" type="text" v-model="name" placeholder="nome" />
        <input
          class="input"
          type="text
        "
          v-model="cpf"
          placeholder="cpf"
        />
      </div>
      <router-link to="/admin">
      <div class="button">
        <button> entrar</button>
      </div>
      </router-link>

    </div>
  </main>
</template>

<style scoped>

.container {
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
  padding: 20px ;
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