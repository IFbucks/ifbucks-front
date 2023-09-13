<script setup>
import SidebarCozinha from "../components/SidebarCozinha.vue";
</script>
<template>
  <div class="container">
    <div class="sidebar">
      <SidebarCozinha />
    </div>
    <div class="wrapper">
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
