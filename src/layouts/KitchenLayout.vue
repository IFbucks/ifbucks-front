<script>
import { ref, onMounted } from 'vue'
import HeaderComp from '../components/HeaderComp.vue'
import SidebarComp from '../components/SidebarComp.vue'
import axiosInstance from '../axios/axiosInstance'

export default {
  components: {
    HeaderComp,
    SidebarComp
  },

  setup() {
    const isSidebarOpen = ref(true)
    const sidebar_items = ref([])

    async function getMesas() {
      const response = await axiosInstance.get('/mesas/')
      console.log(response)
      const data = await response.data
      const mesas = data.map((i) => ({
        to: `/mesa/${i.id}`,
        title: `Mesa ${i.numero}`
      }))

      sidebar_items.value = mesas
    }

    onMounted(() => {
      getMesas()
    })

    return {
      isSidebarOpen,
      sidebar_items
    }
  }
}
</script>

<template>
  <div class="container__cozinha">
    <HeaderComp />
    <div class="wrapper__main">
      <SidebarComp :sidebar_items="sidebar_items" />

      <div class="wrapper__content">
        <router-view />
      </div>
    </div>
  </div>
</template>

<style scoped>
.container__cozinha {
  width: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
}

.wrapper__content {
  width: 100%;
  padding: 1em;
  overflow-y: scroll;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}

.wrapper__content::-webkit-scrollbar {
  display: none;
}
.wrapper__main {
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100%;
  max-height: 100vh;
}
</style>
