<template>
  <div class="container">
    <AlertaComp
      v-if="alertaAtivo"
      :mensagem="alertaMensagem"
      :tipo="alertaTipo"
      :fecharAlerta="fecharAlerta"
    />
    <h1>Cadastrar Novo Funcionário</h1>
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
          <option v-for="cargo in cargos" :key="cargo.id" :value="cargo.value">
            {{ cargo.value }}
          </option>
        </select>
      </div>
      <div class="grupo-inputs">
        <label for="imagem">Imagem:</label>
        <input type="file" ref="fileInput" @change="handleFileChange" />
      </div>
      <button @click="postFuncionario">Adicionar</button>
      <button @click="cancelarEdicaoFuncionario" v-if="editingFuncionarioId">Cancelar</button>
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
import axios from 'axios'
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
      funcionarioAdicionado: false,
      editingFuncionarioId: null,

      alertaAtivo: false,
      alertaTipo: 'erro',
      alertaMensagem: 'Algo deu errado',

      cargos: [
        { value: 'Cliente', id: 1 },
        { value: 'Funcionário', id: 2 },
        { value: 'Gerente', id: 3 },
        { value: 'Garçom', id: 4 }
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
    async getFuncionarios() {
      try {
        const response = await axios.get('http://localhost:8000/usuarios/')
        this.funcionarios = response.data
      } catch (error) {
        console.error('Erro ao buscar funcionários:', error)
        this.setAlert('erro', 'Erro ao buscar funcionários')
      }
    },
    handleFileChange(event) {
      this.imagem = event.target.files[0]
    },
    async postFuncionario() {
      if (!this.nome || !this.email || !this.cpf || !this.cargo || !this.imagem) {
        this.setAlert('erro', 'Todos os campos são obrigatórios')
        return
      }

      const formData = new FormData()
      formData.append('cpf', this.cpf)
      formData.append('email', this.email)
      formData.append('nome', this.nome)
      formData.append('tipopessoa', parseInt(this.cargo))
      formData.append('imagem', this.imagem)

      try {
        const response = await axios.post('http://localhost:8000/usuarios/', formData)
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
        await axios.delete(`http://localhost:8000/usuarios/${id}/`)
        this.funcionarios = this.funcionarios.filter((funcionario) => funcionario.id !== id)
        this.setAlert('sucesso', 'Funcionário excluído com sucesso')
      } catch (error) {
        console.error('Erro ao excluir funcionário:', error)
        this.setAlert('erro', 'Erro ao excluir funcionário')
      }
    },
    async editaFuncionario(id, nome, cpf, email, cargo) {
      const dadosAtualizados = {
        cpf,
        email,
        nome,
        tipopessoa: parseInt(cargo)
      }

      try {
        await axios.put(`http://localhost:8000/usuarios/${id}/`, dadosAtualizados)
        this.funcionarios = this.funcionarios.map((funcionario) => {
          if (funcionario.id === id) {
            funcionario.cpf = cpf
            funcionario.email = email
            funcionario.nome = nome
            funcionario.tipopessoa = parseInt(cargo)
          }
          return funcionario
        })
        this.limparCampos()
        this.setAlert('sucesso', 'Funcionário editado com sucesso')
      } catch (error) {
        console.error('Erro ao editar funcionário:', error)
        this.setAlert('erro', 'Erro ao editar funcionário')
      }
    },
    handleEdit(id) {
      const nome = prompt('Digite o novo nome do funcionário:')
      const cpf = prompt('Digite o novo CPF do funcionário:')
      const email = prompt('Digite o novo email do funcionário:')
      const cargo = prompt('Digite o novo cargo do funcionário:')
      if (nome !== null && cpf !== null && email !== null && cargo !== null) {
        this.editaFuncionario(id, nome, cpf, email, cargo)
      }
    },
    cancelarEdicaoFuncionario() {
      this.limparCampos()
    },
    limparCampos() {
      this.nome = ''
      this.email = ''
      this.cpf = ''
      this.cargo = ''
      this.imagem = null
      this.editingFuncionarioId = null
      this.funcionarioAdicionado = false
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
