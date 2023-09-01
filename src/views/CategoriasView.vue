<script setup></script>

<template>
  <div class="container-categorias">
    <h1>Cadastrar Nova Categoria</h1>
    <div class="input-categoria">
      <input type="text" id="nome-categoria" v-model="nome" placeholder="Nome" />

      <input type="text" id="descricao-categoria" v-model="descricao" placeholder="Descrição" />
      <div class="button">
        <button>Adicionar</button>
        <!--p/ colocar botao p/ baixo como figma, é so tirar da classe input-categoria-->
      </div>
    </div>
  </div>
</template>

<style scoped>
.container-categorias {
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
.input-categoria {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
}
input::-webkit-input-placeholder {
  font-size: 14px;
  font-family: 'Poppins', sans-serif;
  color: black;
}
#nome-categoria,
#descricao-categoria {
  width: 40%;
  margin: 0 1em;
}
button {
  padding: 15px;
  border-radius: 7px;
  background: #004d03;
  border: none;
  color: #fff;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s;
}
button:hover {
  background-color: #0f2c11;
}
.button {
  display: flex;
  align-items: center;
  justify-content: right;
  width: 100%;
  padding: 1em;
}
</style>
