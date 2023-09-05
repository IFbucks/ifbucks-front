<template>
  <div class="container">
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
          <option value="1">Funcionário</option>
          <option value="2">Cliente</option>
          <option value="3">Administrador</option>
        </select>
        <button @click="postFuncionario">Adicionar</button>
      </div>
      <div v-if="funcionarioAdicionado" class="feedback">
        Funcionário adicionado com sucesso!
      </div>
    </div>

    <div class="funcionarios">
      <FuncionarioComp
        v-for="funcionario in funcionarios"
        :key="funcionario.id"
        :nome="funcionario.nome"
        :descricao="funcionario.email"
        :deleteFuncionario="deleteFuncionario"
        :id="funcionario.id"
        :editaFuncionario="handleEdit"
      />
    </div>
  </div>
</template>

<script>
import FuncionarioComp from '../components/FuncionarioComp.vue'
import axios from 'axios'

export default {
  data() {
    return {
      nome: '',
      email: '',
      cpf: '',
      cargo: '',
      funcionarios: [],
      funcionarioAdicionado: false,
    }
  },
  components: {
    FuncionarioComp
  },
  methods: {
    async getFuncionarios() {
      try {
        const response = await axios.get('http://localhost:8000/usuarios/')
        this.funcionarios = response.data
      } catch (error) {
        console.error('Erro ao buscar funcionários:', error)
      }
    },
    async postFuncionario() {
      if (!this.nome || !this.email || !this.cpf || !this.cargo) {
        alert('Preencha todos os campos antes de adicionar um funcionário.');
        return;
      }

      const novoFuncionario = {
        cpf: this.cpf,
        email: this.email,
        nome: this.nome,
        tipopessoa: parseInt(this.cargo)
      }

      try {
        const response = await axios.post('http://localhost:8000/usuarios/', novoFuncionario)
        this.funcionarios.push(response.data)
        this.nome = ''
        this.email = ''
        this.cpf = ''
        this.cargo = ''
        this.funcionarioAdicionado = true;
      } catch (error) {
        console.error('Erro ao adicionar funcionário:', error)
      }
    },
    async deleteFuncionario(id) {
      try {
        await axios.delete(`http://localhost:8000/usuarios/${id}/`)
        this.funcionarios = this.funcionarios.filter((funcionario) => funcionario.id !== id)
      } catch (error) {
        console.error('Erro ao excluir funcionário:', error)
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
      } catch (error) {
        console.error('Erro ao editar funcionário:', error)
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

.funcionarios{
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  gap: 1em;
}
</style>
