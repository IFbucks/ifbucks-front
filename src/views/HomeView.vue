<script setup>
import loginCompVue from '../components/loginComp.vue'
</script>

<template>
  <div class="container">
    <div class="image-container">
      <img src="../assets/loginImage.png" alt="" />
    </div>

    <div class="login-container">
      <loginCompVue />
    </div>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
}
.login-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 55%;
}
.image-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 45%;
}
</style>
