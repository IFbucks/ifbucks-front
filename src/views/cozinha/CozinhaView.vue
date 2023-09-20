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
                <th scope="col">Mesa</th>
                <th scope="col">Pedidos</th>
                <th scope="col">Status</th>
                <th scope="col">Cliente</th>
                <th scope="col">Ações</th>
              </tr>
            </thead>
            <tbody>
              <CozinhaTableRow v-for="pedido in pedidos" :key="pedido.id" :pedido="pedido" />
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import axios from 'axios'

import CozinhaTableRow from '../../components/CozinhaTableRow.vue'

export default {
  components: { CozinhaTableRow },
  setup() {
    const pedidos = ref([])
    async function getPedidos() {
      try {
        const response = await axios.get('http://127.0.0.1:8000/carrinho/')
        const data = response.data
        pedidos.value = data
      } catch (e) {
        console.log(e)
      }
    }
    onMounted(() => {
      getPedidos()
    })
    return {
      pedidos
    }
  },
  components: { CozinhaTableRow }
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
