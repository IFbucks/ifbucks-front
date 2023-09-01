<script setup></script>

<template>
  <div class="container-funcionarios">
    <h1>Cadastrar Novo Funcionário</h1>
    <div class="input-funcionarios">
      <input type="text" id="nome" v-model="nome" placeholder="Nome" />
      <input type="text" id="sobrenome" v-model="sobrenome" placeholder="Sobrenome" />
        <!-- <input type="text" id="cpf" v-model="cpf" placeholder="CPF" />-->
      <select id="funcionario" name="funcionario">
        <option value="id-funcionario" disabled selected>Cargo</option>
        <option value="gerente">Gerente</option>
        <option value="barista">Barista</option>
        <option value="atendente">Atendente</option>
      </select>
    </div>
  </div>
</template>

<style scoped>
.container-funcionarios {
  display: flex;
  flex-direction: column;
  align-content: center;
  align-items: center;
  width: 100%;
  padding: 2em;
}
h1 {
  color: #004d03;
  font-weight: bold;
}
input {
  max-width: 600px;
  width: 100%;
  padding: 15px;
  flex-shrink: 0;
  border-radius: 7px;
  background: #d9d9d9;
  border: none;
}
input::-webkit-input-placeholder {
  font-size: 14px;
  font-family: 'Poppins', sans-serif;
  color: black;
}
.input-funcionarios {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
}
select {
  max-width: 300px;
  width: 100%;
  padding: 15px;
  flex-shrink: 0;
  border-radius: 7px;
  background: #d9d9d9;
  border: none;
  font-family: poppins, sans-serif;
}
</style>
