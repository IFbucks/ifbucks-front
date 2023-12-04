<template>
  <div class="container">
    <AlertaComp
      v-if="alertaAtivo"
      :mensagem="alertaMensagem"
      :tipo="alertaTipo"
      :fecharAlerta="fecharAlerta"
    />
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
import CategoriaComp from '@/components/CategoriaComp.vue'
import axiosInstance from '../../axios/axiosInstance'
import AlertaComp from '../../components/AlertaComp.vue'

export default {
  data() {
    return {
      nome: '',
      descricao: '',
      categorias: [],
      alertaAtivo: false,
      alertaTipo: 'erro',
      alertaMensagem: 'Algo deu errado'
    }
  },
  components: {
    CategoriaComp,
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
        const response = await axiosInstance.get('https://ifbucks.1.ie-1.fl0.io/categorias/')
        this.categorias = response.data
      } catch (error) {
        console.error('Erro ao buscar categorias:', error)
        this.setAlert('erro', 'Erro ao buscar categorias')
      }
    },
    async postCategoria() {
      if (!this.nome) {
        this.setAlert('erro', 'O nome da categoria é obrigatório')
        return
      }
      try {
        const novaCategoria = {
          nome: this.nome,
          descricao: this.descricao
        }
        const response = await axiosInstance.post(
          'https://ifbucks.1.ie-1.fl0.io/categorias/',
          novaCategoria
        )
        this.categorias.push(response.data)
        this.nome = ''
        this.descricao = ''
        this.setAlert('sucesso', 'Categoria adicionada com sucesso')
      } catch (error) {
        console.error('Erro ao adicionar categoria:', error)
        this.setAlert('erro', 'Erro ao adicionar categoria')
      }
    },
    async deleteCategoria(id) {
      try {
        await axiosInstance.delete(`https://ifbucks.1.ie-1.fl0.io/categorias/${id}/`)
        // Remove a categoria com o id correspondente da lista
        this.categorias = this.categorias.filter((categoria) => categoria.id !== id)
        this.setAlert('sucesso', 'Categoria excluída com sucesso')
      } catch (error) {
        console.error('Erro ao excluir categoria:', error)
        this.setAlert('erro', 'Erro ao excluir categoria')
      }
    },

    async editaCategoria(id, nome) {
      try {
        await axiosInstance.put(`https://ifbucks.1.ie-1.fl0.io/categorias/${id}/`, { descricao: nome })
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
