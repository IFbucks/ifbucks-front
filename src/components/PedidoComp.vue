<template>
  <div class="pedido__container">
    <div class="pedido__icon">
      <h1>ICON</h1>
    </div>

    <div class="pedido__title">
      <h1>Mesa {{ pedido.mesa }}</h1>
      <h2>{{ pedido.usuario }}</h2>
    </div>
    <div class="pedido__controls">
      <div>Pedido feito em {{ formatDateTime(pedido.hora_pedido) }}</div>
      <div>Total de itens: {{ pedido.items_pedidos.length }}</div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import axios from 'axios'

export default {
  name: 'PedidoComp',
  props: {
    pedido: {
      type: Object,
      required: true
    }
  },

  setup(props) {
    const pedido = ref(props.pedido)

    async function getProduto() {
      try {
        const response = await axios.get(
          `http://localhost:8000/produtos/${pedido.value.items.pedido[0]}/}`
        )
        const data = await response.data

        pedido.value = data
      } catch (error) {
        console.error(error)
      }
    }

    onMounted(() => {
      getProduto()
    })

    return {}
  }
}
</script>

<style scoped>
.pedido__container {
  background-color: #e2e8f0;
  padding: 1em;
  border-radius: 1em;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  gap: 1em;
  margin-bottom: 1em;
  transition: background-color 0.3s;
  cursor: pointer;
  max-width: 600px;
  width: 100%;
}

.pedido__container:hover {
  background-color: #cbd5e1;
}

.pedido__title {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
}

.pedido__title h1 {
  font-size: 3em;
  width: 100%;
}

.pedido__title h2 {
  font-size: 1em;
  width: 100%;
}
</style>
