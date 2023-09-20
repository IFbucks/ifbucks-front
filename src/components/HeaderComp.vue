<template>
  <div class="container__header">
    <div class="header__title">
      <div class="header__logo">
        <span>IF</span>
        <span>Bucks</span>
      </div>
    </div>

    <div class="header__nav">
      <router-link to="/cozinha">Cozinha</router-link>

      <router-link to="/admin/categorias">Administração</router-link>

      <router-link to="/">Sair</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HeaderComp',
  props: {
    nome: String,
    descricao: String,
    deleteCategoria: Function,
    editaCategoria: Function,
    id: Number
  }
}
</script>

<style scoped>
.container__header {
  display: flex;
  width: 100%;
  padding: 0 6em 0 6em;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background-color: #16a34a;
  filter: drop-shadow(0 1px 2px rgb(0 0 0 / 0.1)) drop-shadow(0 1px 1px rgb(0 0 0 / 0.06));
  height: 10vh;
}

.header__nav {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 1em;
  list-style: none;
  max-width: 300px;
  width: 100%;
}

a {
  cursor: pointer;
  color: white;

  transition: background-color 0.3s;
  text-decoration: none;
  padding: 1em;
  border-radius: 1em;
}

a:hover {
  background-color: #15803d;
}

.header__title {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.5em;
  color: white;
}

.header__logo {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 2px;
  font-size: 2em;
}

.header__logo span:nth-child(1) {
  font-weight: 700;
}

.header__logo span:nth-child(2) {
  font-weight: 300;
}
</style>
