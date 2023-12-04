<template>
  <div>
    <h1>Mesa {{ mesa_id }}</h1>
  </div>

  <div>
    <PedidoComp
      v-for="pedido in pedidos"
      :key="pedido.id"
      :pedido="pedido"
      :v-if="pedido.entregue === false"
      v-if="pedidos.length !== 0"
    />

    <div v-if="pedidos.length === 0">
      <p>Não há pedidos para essa mesa</p>
    </div>
  </div>
</template>

<script>
import axiosInstance from '../../axios/axiosInstance'
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
        const response = await axiosInstance.get(
          `https://ifbucks.1.ie-1.fl0.io/mesas/${mesa_id.value}/carrinho/`
        )
        const data = await response.data

        carrinho.value = data
      } catch (error) {
        console.error(error)
      }
    }

    async function getPedidos() {
      try {
        const response = await axiosInstance.get(
          `https://ifbucks.1.ie-1.fl0.io/mesas/${mesa_id.value}/pedidos/`
        )
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
