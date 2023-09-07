<template>
  <div class="container-produto">
    <div class="titulo">


      <img :src="imagem" alt="" class="imagem">
      <h1>{{ nome }}</h1>
      <p>{{ preco }}</p>

      <p>
        {{ descricao }}
      </p>
    </div>

    <div class="botoes">
      <button @click="editProduto">Editar</button>
      <button @click="confirmDelete">Excluir</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProdutoComp',
  props: {
    nome: String,
    descricao: String,
    preco: String,
    deleteitem: Function,
    editaCategoria: Function,
    imagem: String,
    id: Number
  },
  methods: {
    editProduto() {
      this.editaProduto(this.id)
    },
    confirmDelete() {
      this.deleteitem(this.id)
    }
  }
}
</script>

<style scoped>
.titulo {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 4em;
}

.imagem {
  width: 100px;
  height: 100px;
  border-radius: 1em;
}
.container-produto {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
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
