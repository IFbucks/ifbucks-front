<template>
  <div>
    <h1>Mesa {{ mesa_id }}</h1>
  </div>

  <div>
    <PedidoComp v-for="pedido in pedidos" :key="pedido.id" :pedido="pedido" />
  </div>
</template>

<script>
import axios from 'axios'
import { ref, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'

import PedidoComp from '../../components/PedidoComp.vue'

export default {
  components: {
    PedidoComp
  },

  setup() {
    const route = useRoute()
    const pedidos = ref([])
    const carrinho = ref([])
    const mesa_id = ref()

    async function getCarrinho() {
      try {
        const response = await axios.get(`http://localhost:8000/mesas/${mesa_id.value}/carrinho/`)
        const data = await response.data

        carrinho.value = data
      } catch (error) {
        console.error(error)
      }
    }

    async function getPedidos() {
      try {
        const response = await axios.get(`http://localhost:8000/mesas/${mesa_id.value}/pedidos/`)
        const data = await response.data

        pedidos.value = data
      } catch (error) {
        console.error(error)
      }
    }

    onMounted(() => {
      mesa_id.value = route.params.id
      getPedidos()
      getCarrinho()
    })

    watch(
      () => route.params.id,
      (newMesaId, oldMesaId) => {
        if (newMesaId !== oldMesaId) {
          mesa_id.value = newMesaId
          getPedidos()
          getCarrinho()
        }
      }
    )

    return {
      pedidos,
      mesa_id
    }
  }
}
</script>
