<template>
  <div class="pedido__container">
    <div class="pedido__icon">
      <img :src="produto.imagem" :alt="produto.nome" />
    </div>

    <div class="pedido__title">
      <h1>{{ produto.nome }}</h1>
      <h2>{{ produto.descricao }}</h2>
    </div>
    <div class="pedido__controls">
      <div>{{ pedido.quantidade }} unidades</div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import axiosInstance from '../axios/axiosInstance'

export default {
  name: 'PedidoComp',
  props: {
    pedido: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const produto = ref({})

    async function getProduto() {
      try {
        const response = await axiosInstance.get(`/produtos/${props.pedido.produto}/`)
        const data = await response.data

        produto.value = data
      } catch (error) {
        console.error(error)
      }
    }

    onMounted(() => {
      getProduto()
    })

    return {
      produto
    }
  }
}
</script>

<style scoped>
.pedido__container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  background-color: #d9d9d9;
  border-radius: 0.5rem;
  margin-bottom: 1rem;
}

.pedido__icon {
  width: 5rem;
  height: 5rem;
  border-radius: 0.5em;
  overflow: hidden;
  margin-right: 1rem;
}

.pedido__icon img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.pedido__title {
  flex: 1;
}

.pedido__title h1 {
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
}

.pedido__title h2 {
  font-size: 1rem;
  color: #666;
}

.pedido__controls {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}
</style>
