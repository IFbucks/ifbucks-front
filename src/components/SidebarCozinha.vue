<template>
  <div class="sidebar" >
    <div class="cabecalho-sidebar">
      <img src="../assets/ifbucksLogo.png" alt="logo" class="logo" />
      <h1 class="titulo">Cozinha</h1>
    </div>
    <ul>
      <li>>Cadastrar Categoria</li>
      <li>Cadastrar Funcionario</li>
      <li>Cadastrar Itens</li>
    </ul>
  </div>

</template>

<script setup>

</script>

<style scoped>
.sidebar {
  height: 100vh;
  background-color: #379e3c;
  color: white;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
}

ul {
  list-style: none;
  padding: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
  gap: 0.2rem;
  width: 100%;
}

li {
  padding: 1em 0;
  width: 100%;
  cursor: pointer;
  transition: background-color 0.3s;
  display: flex;
  justify-content: center;
}

li:hover {
  background-color: #0f2c11;
  color: #ffff;
}

.cabecalho-sidebar {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100%;
  border-bottom: 1px solid #ffff;
}

.titulo {
  font-size: 1.5em;
  font-weight: bold;
  text-align: center;
}

</style>