<script setup>
import loginCompVue from '../components/loginComp.vue'
</script>

<template>
  <div class="container__login">
    <div class="card">
      <img src="../assets/loginImage.png" alt="" />

      <div class="login-container">
        <loginCompVue />
      </div>
    </div>
  </div>
</template>

<style scoped>
.container__login {
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1em;
  background-color: #f8fafc;
}

.card {
  width: 100%;
  max-width: 1200px;
  height: 80vh;
  background-color: white;

  border-radius: 1em;
  overflow: hidden;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.login-container {
  width: 50%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
img {
  height: 100%;
  width: 50%;
  object-fit: cover;
  object-position: center;
}

@media screen and (max-width: 768px) {
  img {
    display: none;
  }

  .login-container {
    width: 100%;
  }
}
</style>
