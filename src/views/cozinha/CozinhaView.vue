<template>
  <div>
    <div class="row">
      <div class="col-md-12">
        <h1 class="text-center">Pedidos</h1>
      </div>
    </div>
    <div class="row">
      <div class="col-md-12">
        <div class="table-responsive">
          <table class="table table-bordered table-striped">
            <thead class="table-header">
              <tr>
                <th scope="col">Horário do pedido</th>
                <th scope="col">Quantidade</th>
                <th scope="col">Status</th>
                <th scope="col">Carrinho</th>
                <th scope="col">Ações</th>
              </tr>
            </thead>
            <tbody>
              <CozinhaTableRow
                v-for="pedido in pedidos"
                :key="pedido.id"
                :pedido="pedido"
                :entregar="entregar"
                :excluir="excluir"
                :v-show="pedido.entregue == false"
                v-if="pedidos.length !== 0"
              />

              <tr v-if="pedidos.length === 0">
                <td colspan="5" class="text-center">Não há pedidos para serem entregues</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import axiosInstance from '../../axios/axiosInstance'

import CozinhaTableRow from '../../components/CozinhaTableRow.vue'

export default {
  components: { CozinhaTableRow },
  setup() {
    const pedidos = ref([])
    async function getPedidos() {
      try {
        const response = await axiosInstance.get('/pedidos/')
        const data = response.data
        pedidos.value = data
      } catch (e) {
        console.log(e)
      }
    }

    async function entregar(id) {
      try {
        await axiosInstance.patch(`/pedidos/${id}/`, {
          entregue: true
        })

        console.log(pedidos.value)

        pedidos.value = pedidos.value.map((pedido) => {
          if (pedido.target.id === id) {
            pedido.entregue = true
          }
          return pedido
        })
      } catch (e) {
        console.log(e)
      }
    }

    async function excluir(id) {
      try {
        await axiosInstance.delete(`/pedidos/${id}/`)
        this.pedidos = this.pedidos.filter((pedido) => pedido.id !== id)
      } catch (e) {
        console.log(e)
      }
    }

    onMounted(() => {
      getPedidos()
    })
    return {
      pedidos,
      entregar,
      excluir
    }
  }
}
</script>

<style>
.row {
  margin-top: 20px;
}

h1 {
  text-align: center;
  margin-bottom: 20px;
}

.table-responsive {
  overflow-x: auto;
}

.table {
  width: 100%;
  border-collapse: collapse;
  border-spacing: 0;
}

.table th,
.table td {
  padding: 10px;
  text-align: center;
  vertical-align: middle;
}

.table thead {
  background-color: #f5f5f5;
  font-size: 18px;
}

.table th {
  font-weight: bold;
}

.table tbody tr:nth-child(even) {
  background-color: #f2f2f2;
}

.table tbody tr:nth-child(odd) {
  background-color: #ffffff;
}

.table-striped tbody tr:nth-child(odd) {
  background-color: #f5f5f5;
}

.table-bordered {
  border: 1px solid #dddddd;
  border-radius: 1em;
}

.btn {
  margin: 5px;
}
</style>
