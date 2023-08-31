<script setup></script>

<template>
  <div class="container-categorias">
    <h1>Cadastrar Nova Categoria</h1>
    <div class="input-categoria">
      <input type="text" id="nome" v-model="nome" placeholder="Nome" />

      <input type="text" id="descricao" v-model="descricao" placeholder="Descrição" />
    </div>

    <div class="button">
      <button>Adicionar</button>
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
#nome, #descricao {
  width: 40%;
  margin: 0 1em;

}
</style>
