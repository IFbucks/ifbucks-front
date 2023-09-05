<template>
  <div class="container-categoria">
    <div class="titulo">
      <h1>{{ nome }}</h1>
    </div>

    <div class="botoes">
      <button @click="editCategoria">Editar</button>
      <button @click="confirmDelete">Excluir</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CategoriaComp',
  props: {
    nome: String,
    descricao: String,
    deleteCategoria: Function,
    editaCategoria: Function,
    id: Number,
  },
  methods: {
    editCategoria() {
        this.editaCategoria(this.id)
    },
    confirmDelete() {
      this.deleteCategoria(this.id);
    }
  }
};
</script>

<style scoped>
.titulo {
  display: flex;
  width: 100%;
}
.container-categoria {
  display: flex;
  flex-direction: row;
  align-content: center;
  align-items: center;
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
