<template>
  <tr>
    <td>{{ pedido.mesa }}</td>
    <td class="items__lista">
      <p v-for="(item, index) in nome_items" :key="index">{{ item }},</p>
    </td>
    <td>{{ pedido.status }}</td>
    <td>{{ pedido.usuario }}</td>
    <td>
      <button class="btn btn-success" @click="marcarComoEntregue">Entregue</button>
      <button class="btn btn-danger" @click="excluirPedido">Excluir</button>
    </td>
  </tr>
</template>

<script>
import axios from 'axios'
import { ref, onMounted } from 'vue'

export default {
  name: 'CozinhaTableRow',
  props: {
    pedido: Object
  },
  setup(props) {
    const nome_items = ref([])

    async function getItems() {
      const responses = await Promise.all(
        props.pedido.items_pedidos.map(async (item) => {
          const response = await axios.get(`http://localhost:8000/produtos/${item}/`)
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
