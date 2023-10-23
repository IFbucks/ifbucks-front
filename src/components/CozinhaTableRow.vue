<template>
  <tr>
    <td>
      {{
        new Date(pedido.hora_pedido).toLocaleDateString('en-GB', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit'
        })
      }}
    </td>
    <td>{{ pedido.quantidade }}</td>
    <td>{{ pedido.entregue ? 'Entregue' : 'Pendente' }}</td>
    <td>{{ pedido.carrinho }}</td>
    <td>
      <button class="btn btn-success" @click="entregar(pedido.id)">Entregue</button>
      <button class="btn btn-danger" @click="excluir(pedido.id)">Excluir</button>
    </td>
  </tr>
</template>

<script>
import axiosInstance from '../axios/axiosInstance'

import { ref, onMounted, computed } from 'vue'

export default {
  name: 'CozinhaTableRow',
  props: {
    pedido: Object,
    entregar: Function,
    excluir: Function
  },
  setup(props) {
    const nome_items = ref([])

    async function getItems() {
      const responses = await Promise.all(
        props.pedido.items_pedidos.map(async (item) => {
          const response = await axiosInstance.get(`/produtos/${item}/`)
          return response.data.nome
        })
      )
      nome_items.value = responses
    }

    onMounted(() => {
      getItems()
    })

    return {
      nome_items
    }
  }
}
</script>

<style>
.items__lista {
  list-style: none;
  padding: 0;
  display: flex;
  flex-direction: row;
}
</style>
