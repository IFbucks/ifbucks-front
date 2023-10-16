<template>
  <div class="container">
    <AlertaComp
      v-if="alertaAtivo"
      :mensagem="alertaMensagem"
      :tipo="alertaTipo"
      :fecharAlerta="fecharAlerta"
    />
    <h1>{{ editingFuncionarioId ? 'Editar Funcionário' : 'Cadastrar Novo Funcionário' }}</h1>
    <div class="form">
      <div class="grupo-inputs">
        <label for="nome">Nome:</label>
        <input type="text" v-model="nome" id="nome" placeholder="Nome" />
      </div>
      <div class="grupo-inputs">
        <label for="email">Email:</label>
        <input type="email" v-model="email" id="email" placeholder="Email" />
      </div>
      <div class="grupo-inputs">
        <label for="cpf">CPF:</label>
        <input type="text" v-model="cpf" id="cpf" placeholder="CPF" />
      </div>
      <div class="grupo-inputs">
        <label for="cargo">Cargo:</label>
        <select v-model="cargo" id="cargo">
          <option value="" disabled selected>Selecione um Cargo</option>
          <option v-for="cargoOption in cargos" :key="cargoOption.id" :value="cargoOption.value">
            {{ cargoOption.value }}
          </option>
        </select>
      </div>
      <div class="grupo-inputs">
        <label for="imagem">Imagem:</label>
        <input type="file" ref="fileInput" @change="handleFileChange" />
      </div>

      <div class="grupo-botoes">
        <button @click="cancelarEdicaoFuncionario" v-if="editingFuncionarioId">Cancelar</button>
        <button
          @click="editingFuncionarioId ? putFuncionario(editingFuncionarioId) : postFuncionario()"
        >
          {{ editingFuncionarioId ? 'Salvar' : 'Adicionar' }}
        </button>
      </div>
    </div>

    <div class="funcionarios">
      <FuncionarioComp
        v-for="funcionario in funcionarios"
        :key="funcionario.id"
        :nome="funcionario.nome"
        :email="funcionario.email"
        :cpf="funcionario.cpf"
        :cargo="funcionario.cargo"
        :imagem="funcionario.imagem"
        :id="funcionario.id"
        :deleteFuncionario="deleteFuncionario"
        :editaFuncionario="handleEdit"
      />
    </div>
  </div>
</template>

<script>
import FuncionarioComp from '@/components/FuncionarioComp.vue'
import axiosInstance from '../../axios/axiosInstance'
import AlertaComp from '../../components/AlertaComp.vue'

export default {
  data() {
    return {
      nome: '',
      email: '',
      cpf: '',
      cargo: '',
      imagem: null,
      funcionarios: [],
      editingFuncionarioId: null,
      alertaAtivo: false,
      alertaTipo: 'erro',
      alertaMensagem: 'Algo deu errado',
      cargos: [
        { value: 'Cliente', id: 1 },
        { value: 'Garçom', id: 2 },
        { value: 'Cozinheiro', id: 3 },
        { value: 'Gerente', id: 4 }
      ]
    }
  },
  components: {
    FuncionarioComp,
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
    handleFileChange(event) {
      this.imagem = event.target.files[0]
    },
    async getFuncionarios() {
      try {
        const response = await axiosInstance.get('http://localhost:8000/usuarios/')
        this.funcionarios = response.data
      } catch (error) {
        console.error('Erro ao buscar funcionários:', error)
        this.setAlert('erro', 'Erro ao buscar funcionários')
      }
    },

    async postFuncionario() {
      if (!this.nome || !this.email || !this.cpf || !this.cargo || !this.imagem) {
        this.setAlert('erro', 'Todos os campos são obrigatórios')
        return
      }

      const novoFuncionario = {
        id: 3,
        cpf: '9876542154',
        cargo: 'Cliente',
        email: 'Cliente@cliente.com',
        nome: 'asdasd',
        imagem: null
      }

      try {
        const response = await axiosInstance.post(
          'http://localhost:8000/usuarios/',
          novoFuncionario,
          {
            headers: {
              'Content-Type': 'application/json'
            }
          }
        )
        this.funcionarios.push(response.data)
        this.limparCampos()
        this.funcionarioAdicionado = true
        this.setAlert('sucesso', 'Funcionário adicionado com sucesso!')
      } catch (error) {
        console.error('Erro ao adicionar funcionário:', error)
        this.setAlert('erro', 'Erro ao adicionar funcionário')
      }
    },
    async deleteFuncionario(id) {
      try {
        await axiosInstance.delete(`http://localhost:8000/usuarios/${id}/`)
        this.funcionarios = this.funcionarios.filter((funcionario) => funcionario.id !== id)
        this.setAlert('sucesso', 'Funcionário excluído com sucesso')
      } catch (error) {
        console.error('Erro ao excluir funcionário:', error)
        this.setAlert('erro', 'Erro ao excluir funcionário')
      }
    },
    async putFuncionario(id) {
      const funcionarioEditado = {
        nome: this.nome,
        email: this.email,
        cpf: this.cpf,
        cargo: this.cargo,
        imagem: this.imagem
      }

      try {
        console.log(funcionarioEditado)
        const response = await axiosInstance.put(
          `http://localhost:8000/usuarios/${id}/`,
          funcionarioEditado
        )

        const novosFuncionarios = this.funcionarios.map((funcionario) =>
          funcionario.id === id ? response.data : funcionario
        )

        this.funcionarios = novosFuncionarios
      } catch (error) {
        console.error('Erro ao buscar funcionários:', error)
        this.setAlert('erro', 'Erro ao buscar funcionários')
      }
    },
    handleEdit(id) {
      const funcionario = this.funcionarios.find((func) => func.id === id)

      this.nome = funcionario.nome
      this.email = funcionario.email
      this.cpf = funcionario.cpf
      this.cargo = funcionario.cargo
      this.editingFuncionarioId = id
    },
    cancelarEdicaoFuncionario() {
      this.nome = ''
      this.email = ''
      this.cpf = ''
      this.cargo = ''
      this.imagem = null
      this.editingFuncionarioId = null
    }
  },
  mounted() {
    this.getFuncionarios()
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

.form {
  display: flex;
  flex-direction: column;
  align-items: start;
  width: 100%;
  gap: 2em;
  margin-bottom: 2em;
}

label {
  font-weight: bold;
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
  flex-direction: column;
  width: 100%;
  gap: 1em;
}

.grupo-botoes {
  display: flex;
  flex-direction: row;
  width: 100%;
  gap: 1em;
}

.grupo-botoes > button {
  width: 100%;
}

.feedback {
  color: green;
  font-weight: bold;
  margin-top: 1em;
}

.funcionarios {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  gap: 1em;
}
</style>
