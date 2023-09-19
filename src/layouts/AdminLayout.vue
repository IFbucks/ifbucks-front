<script>
import HeaderComp from '../components/HeaderComp.vue'
import SidebarComp from '../components/SidebarComp.vue'

export default {
  components: {
    HeaderComp,
    SidebarComp
  },

  setup() {
    return {
      isSidebarOpen: true,
      sidebar_items: [
        {
          to: '/admin/categorias',
          title: 'Cadastrar Categoria'
        },

        {
          to: '/admin/funcionarios',
          title: 'Cadastrar Funcionario'
        },
        {
          to: '/admin/itens',
          title: 'Cadastrar novos itens'
        }
      ]
    }
  },
  methods: {}
}
</script>
<template>
  <div class="container__admin">
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
.container__admin {
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
  max-height: 90vh;
}
</style>
