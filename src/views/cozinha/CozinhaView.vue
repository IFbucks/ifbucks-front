<script>
import { ref, onMounted } from 'vue'
import axios from 'axios'
export default {
  setup() {
    const pedidos = ref([])

    async function getPedidos() {
      try {
        const response = await axios.get('http://localhost:8000/pedidos/')
        const data = await response.data

        pedidos.value = data

        console.log(data)
      } catch (error) {
        console.error(error)
      }
    }

    onMounted(() => {
      getPedidos()
    })

    return {}
  }
}
</script>

<template></template>
