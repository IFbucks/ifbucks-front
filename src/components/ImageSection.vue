<script>
export default {
  props: {
    imageSrc: String,
  },
};
</script>

<template>
    <div class="image-section">
      <img :src="imageSrc" alt="Imagem">
    </div>
  </template>

<style scoped>
.image-section {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f0f0f0;
}

.image-section img {
  max-width: 100%;
  max-height: 100%;
}
</style>