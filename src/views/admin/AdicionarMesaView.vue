<template>
  <div class="container">
    <AlertaComp
      v-if="alertaAtivo"
      :mensagem="alertaMensagem"
      :tipo="alertaTipo"
      @fecharAlerta="fecharAlerta"
    />
    <h1>Cadastrar Nova Mesa</h1>

    <div class="form">
      <div class="grupo-inputs">
        <input type="text" v-model="numero_mesa" placeholder="Número da Mesa" />
        <div class="checkbox__container">
          <label for="ativo_checkbox">Mesa Ativa</label>
          <input type="checkbox" v-model="mesa_ativa" id="ativo_checkbox" />
        </div>
        <button @click="postMesa">Adicionar</button>
      </div>
    </div>

    <div class="mesas">
      <div v-for="mesa in mesas" :key="mesa.id" class="mesa__item">
        <div>{{ mesa.numero }} - {{ mesa.status ? 'Ativa' : 'Inativa' }}</div>

        <div>
          <button v-if="mesa.status" @click="inativaMesa(mesa.id)">Inativar</button>
          <button v-else @click="ativaMesa(mesa.id)">Ativar</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axiosInstance from '../../axios/axiosInstance'
import { ref, onMounted } from 'vue'
import AlertaComp from '../../components/AlertaComp.vue'

export default {
  setup() {
    const mesas = ref([])
    const numero_mesa = ref('')
    const mesa_ativa = ref(true)
    const alertaAtivo = ref(false)
    const alertaTipo = ref('erro')
    const alertaMensagem = ref('Algo deu errado')

    function fecharAlerta() {
      alertaAtivo.value = false
    }

    function setAlert(type, mensagem) {
      alertaAtivo.value = true
      alertaTipo.value = type
      alertaMensagem.value = mensagem
    }

    async function getMesas() {
      try {
        const response = await axiosInstance.get('https://ifbucks.1.ie-1.fl0.io/mesas')
        mesas.value = response.data
      } catch (error) {
        setAlert('erro', 'Erro ao buscar mesas.')
      }
    }

    async function postMesa() {
      try {
        const response = await axiosInstance.post('https://ifbucks.1.ie-1.fl0.io/mesas/', {
          numero: numero_mesa.value,
          status: mesa_ativa.value
        })
        mesas.value.push(response.data)
        numero_mesa.value = ''
        setAlert('sucesso', 'Mesa adicionada com sucesso')
      } catch (error) {
        setAlert('erro', 'Erro ao adicionar mesa.')
      }
    }

    async function inativaMesa(id) {
      try {
        await axiosInstance.put(`https://ifbucks.1.ie-1.fl0.io/mesas/${id}/`, {
          numero: mesas.value.find((mesa) => mesa.id === id).numero,
          status: false
        })
        mesas.value = mesas.value.map((mesa) =>
          mesa.id === id ? { ...mesa, status: false } : mesa
        )
      } catch (error) {
        setAlert('erro', 'Erro ao inativar mesa.')
      }
    }

    async function ativaMesa(id) {
      try {
        await axiosInstance.put(`https://ifbucks.1.ie-1.fl0.io/mesas/${id}/`, {
          numero: mesas.value.find((mesa) => mesa.id === id).numero,
          status: true
        })
        mesas.value = mesas.value.map((mesa) => (mesa.id === id ? { ...mesa, status: true } : mesa))
      } catch (error) {
        setAlert('erro', 'Erro ao ativar mesa.')
      }
    }

    onMounted(() => {
      getMesas()
    })

    return {
      numero_mesa,
      mesa_ativa,
      postMesa,
      inativaMesa,
      ativaMesa,
      mesas
    }
  },
  components: { AlertaComp }
}
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}
.mesas {
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 1em;
}

.mesa__item {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  padding: 1em;
  border-radius: 7px;
  background-color: #d9d9d9;
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

.checkbox__container {
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
}

.checkbox__container label {
  margin-bottom: 0.5em;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

input {
  padding: 15px;

  outline: none;
  border-radius: 7px;
  background: #d9d9d9;
  border: none;
  width: 100%;
}

input[type='checkbox'] {
  width: auto;
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
