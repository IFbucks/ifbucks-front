<template>
  <div class="container">
    <h1>Cadastrar Nova Categoria</h1>

    <div class="form">
      <div class="grupo-inputs">
        <input type="text" v-model="nome" placeholder="Nome" />
        <input type="text" v-model="descricao" placeholder="Descrição" />
        <button @click="postCategoria">Adicionar</button>
      </div>
    </div>

    <div class="categorias">
      <CategoriaComp
        v-for="categoria in categorias"
        :key="categoria.id"
        :nome="categoria.nome"
        :descricao="categoria.descricao"
        :deleteCategoria="deleteCategoria"
        :id="categoria.id"
        :editaCategoria="handleEdit"
      />
    </div>
  </div>
</template>

<script>
import CategoriaComp from '../components/CategoriaComp.vue'
import axios from 'axios'

export default {
  data() {
    return {
      nome: '',
      descricao: '',
      categorias: []
    }
  },
  components: {
    CategoriaComp
  },
  methods: {
    async getCategorias() {
      try {
        const response = await axios.get('http://localhost:8000/categorias/')
        this.categorias = response.data
      } catch (error) {
        console.error('Erro ao obter categorias:', error)
      }
    },
    async postCategoria() {
      if (!this.nome) {
        alert('Por favor, preencha o campo Nome.')
        return
      }
      try {
        const novaCategoria = {
          nome: this.nome,
          descricao: this.descricao
        }
        const response = await axios.post('http://localhost:8000/categorias/', novaCategoria)
        this.categorias.push(response.data)
        this.nome = ''
      } catch (error) {
        console.error('Erro ao adicionar categoria:', error)
      }
    },
    async deleteCategoria(id) {
      try {
        await axios.delete(`http://localhost:8000/categorias/${id}/`)
        // Remove a categoria com o id correspondente da lista
        this.categorias = this.categorias.filter((categoria) => categoria.id !== id)
      } catch (error) {
        console.error('Erro ao excluir categoria:', error)
      }
    },

    async editaCategoria(id, nome) {
      try {
        await axios.put(`http://localhost:8000/categorias/${id}/`, { descricao: nome })
        // Remove a categoria com o id correspondente da lista
        this.categorias = this.categorias.map((categoria) => {
          if (categoria.id === id) {
            categoria.descricao = nome
          }
          return categoria
        })
      } catch (error) {
        console.error('Erro ao editar categoria:', error)
      }
    },

    handleEdit(id) {
      const nome = prompt('Digite o novo nome da categoria:')
      this.editaCategoria(id, nome)
    }
  },
  mounted() {
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
.categorias {
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

input {
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
