<template>
  <div class="container">
    <AlertaComp
      v-if="alertaAtivo"
      :mensagem="alertaMensagem"
      :tipo="alertaTipo"
      :fecharAlerta="fecharAlerta"
    />
    <h1>Cadastrar Novo Produto</h1>

    <div class="form">
      <div class="grupo-inputs">
        <input type="text" v-model="nome" placeholder="Nome" />
        <input type="text" v-model="descricao" placeholder="Descrição" />
        <input type="text" v-model="preco" placeholder="Preço" />
        <input type="file" ref="fileInput" @change="handleFileChange" />
        <select v-model="categoria">
          <option value="" disabled selected>Selecione uma Categoria</option>
          <option v-for="categoria in categorias" :value="categoria.id" :key="categoria.id">
            {{ categoria.nome }}
          </option>
        </select>
        <button @click="postProduto">Adicionar</button>
      </div>
    </div>

    <div class="items">
      <ItemComp
        v-for="item in produtos"
        :key="item.id"
        :nome="item.nome"
        :preco="item.preco"
        :descricao="item.descricao"
        :deleteitem="deleteProduto"
        :editaProduto="editaProduto"
        :imagem="item.imagem"
        :id="item.id"
      />
    </div>
  </div>
</template>

<script>
import ItemComp from '@/components/ItemComp.vue'
import axios from 'axios'
import AlertaComp from '../../components/AlertaComp.vue'

export default {
  data() {
    return {
      nome: '',
      descricao: '',
      preco: '',
      categoria: '',
      imagem: null,
      categorias: [],
      produtos: [],
      editingProductId: null,

      alertaAtivo: false,
      alertaTipo: 'erro',
      alertaMensagem: 'Algo deu errado'
    }
  },
  components: {
    ItemComp,
    AlertaComp
  },
  methods: {
    fecharAlerta() {
      this.alertaAtivo = false
    },
    setAlert(type, mensagem) {
      this.alertaAtivo = true
      this.alertaTipo = type
      this.alertaMensagem = mensagem
    },
    async getCategorias() {
      try {
        const response = await axios.get('http://localhost:8000/categorias/')
        this.categorias = response.data
      } catch (error) {
        console.error('Erro ao obter categorias:', error)
        this.setAlert('erro', 'Erro ao obter categorias')
      }
    },
    async getProdutos() {
      try {
        const response = await axios.get('http://localhost:8000/produtos/')
        this.produtos = response.data
      } catch (error) {
        console.error('Erro ao buscar produtos:', error)
        this.setAlert('erro', 'Erro ao buscar produtos')
      }
    },
    handleFileChange(event) {
      this.imagem = event.target.files[0]
    },
    async postProduto() {
      if (!this.nome || !this.imagem) {
        this.setAlert('erro', 'O nome do produto e a imagem são obrigatórios')
        return
      }

      const formData = new FormData()
      formData.append('nome', this.nome)
      formData.append('descricao', this.descricao)
      formData.append('preco', this.preco)
      formData.append('categoria', this.categoria)
      formData.append('imagem', this.imagem)

      try {
        const response = await axios.post('http://localhost:8000/produtos/', formData)
        this.produtos.push(response.data)
        this.limparCampos()
        this.setAlert('sucesso', 'Produto adicionado com sucesso')
      } catch (error) {
        console.error('Erro ao adicionar produto:', error)
        this.setAlert('erro', 'Erro ao adicionar produto')
      }
    },
    async deleteProduto(id) {
      try {
        await axios.delete(`http://localhost:8000/produtos/${id}/`)
        this.produtos = this.produtos.filter((produto) => produto.id !== id)
        this.setAlert('sucesso', 'Produto excluído com sucesso')
      } catch (error) {
        console.error('Erro ao excluir produto:', error)
        this.setAlert('erro', 'Erro ao excluir produto')
      }
    },
    async editaProduto(id) {
      const produto = this.produtos.find((produto) => produto.id === id)
      this.nome = produto.nome
      this.descricao = produto.descricao
      this.preco = produto.preco
      this.categoria = produto.categoria
      this.editingProductId = id
    },
    async salvarEdicaoProduto() {
      if (!this.nome || !this.imagem || !this.editingProductId) {
        this.setAlert('erro', 'O nome do produto e a imagem são obrigatórios')
        return
      }

      const formData = new FormData()
      formData.append('nome', this.nome)
      formData.append('descricao', this.descricao)
      formData.append('preco', this.preco)
      formData.append('categoria', this.categoria)
      formData.append('imagem', this.imagem)

      try {
        await axios.put(`http://localhost:8000/produtos/${this.editingProductId}/`, formData)
        this.produtos = this.produtos.map((produto) => {
          if (produto.id === this.editingProductId) {
            produto.nome = this.nome
            produto.descricao = this.descricao
            produto.preco = this.preco
            produto.categoria = this.categoria
          }
          return produto
        })
        this.limparCampos()
        this.setAlert('sucesso', 'Produto editado com sucesso')
      } catch (error) {
        console.error('Erro ao editar produto:', error)
        this.setAlert('erro', 'Erro ao editar produto')
      }
    },
    cancelarEdicaoProduto() {
      this.limparCampos()
    },
    limparCampos() {
      this.nome = ''
      this.descricao = ''
      this.preco = ''
      this.categoria = ''
      this.imagem = null
      this.editingProductId = null
    }
  },
  mounted() {
    this.getProdutos()
    this.getCategorias()
  }
}
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}
.items {
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 1em;
}

.form {
  display: flex;
  flex-direction: column;

  align-items: start;

  width: 100%;

  gap: 2em;
  margin-bottom: 2em;
}

input,
select {
  padding: 15px;

  outline: none;
  border-radius: 7px;
  background: #d9d9d9;
  border: none;
  width: 100%;
}

button {
  padding: 15px;

  outline: none;
  border-radius: 7px;
  background: #d9d9d9;
  border: none;
  background-color: #379e3c;
  color: white;
  font-weight: 600;

  transition: all 0.5s;
}

button:hover {
  background-color: #0f2c11;
  cursor: pointer;
}

.grupo-inputs {
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 100%;

  gap: 1em;
}
</style>
