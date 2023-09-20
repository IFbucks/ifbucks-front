<template>
  <div class="container-funcionario">
    <div class="titulo__funtionario">
      <img :src="imagem" alt="" class="imagem" />
      <h1>{{ nome }}</h1>
      <h2>{{ cargo }}</h2>
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
    cargo: String,
    imagem: String,
    id: Number,
    deleteFuncionario: Function,
    editaFuncionario: Function
  },
  methods: {
    editFuncionario() {
      this.editaFuncionario(this.id)
    },
    confirmDelete() {
      this.deleteFuncionario(this.id)
    }
  }
}
</script>

<style scoped>
.imagem {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-right: 1em;
}

.titulo__funtionario {
  display: flex;
  align-items: center;
  gap: 2em;
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
