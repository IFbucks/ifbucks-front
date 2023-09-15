<script>
import SidebarCozinha from "../components/SidebarCozinha.vue";
export default {
  components: {
    SidebarCozinha
  },

  setup() {
    return {
      isSidebarOpen: true
    }
  },
  methods: {
    toggleMenu() {
      this.isSidebarOpen = !this.isSidebarOpen
      console.log(this.isSidebarOpen)
    }
  }
}
</script>
<template> 
   <div class="container">
    <div class="sidebar">
      <SidebarCozinha />
    </div>
    <div class="wrapper">
      <router-view />
    </div>
   </div>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: row;
  position: relative;
}

.sidebar {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
  width: 20vw;
  height: 100vh;
  background-color: #379e3c;
  color: white;
  position: fixed;
  top: 0;
  left: 0;
}
.wrapper {
  width: 100%;
  padding: 1em;
  margin-left: 20vw;
}
</style>
