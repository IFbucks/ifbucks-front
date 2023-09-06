<template>
  <div class="container-funcionario">
    <div class="titulo">
      <h1>{{ nome }}</h1>
    </div>

    <div class="botoes">
      <button @click="editFuncionario">Editar</button>
      <button @click="confirmDelete">Excluir</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FuncionarioComp',
  props: {
    nome: String,
    cpf: String,
    email: String,
    id: Number,
    deleteFuncionario: Function,
    editaFuncionario: Function,
  },
  methods: {
    editFuncionario() {
      this.editaFuncionario(this.id);
    },
    confirmDelete() {
      this.deleteFuncionario(this.id);
    },
  },
};
</script>

<style scoped>
.titulo {
  display: flex;
  width: 100%;
}
.container-funcionario {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 0.5em 1em;
  background-color: #d9d9d9;
  border-radius: 7px;
  width: 100%;

  
}
.botoes {
  display: flex;
  flex-direction: row;
  align-content: center;
  align-items: center;
  justify-content: center;
}
</style>