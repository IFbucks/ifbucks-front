<script>
export default {
  props: {
    isSidebarOpen: {
      type: Boolean,
      required: true
    }
  },
  methods: {
    toggleMenu() {
      this.$emit('toggleMenu')
    }
  }

}
</script>

<template>
  <div class="sidebar" v-show="isSidebarOpen">
    <div class="cabecalho-sidebar">
      <img src="../assets/ifbucksLogo.png" alt="logo" class="logo" />
      <h1 class="titulo">Administrador</h1>
    </div>
    <ul>
      <li><router-link to="/categorias">Cadastrar Categoria</router-link></li>
      <li><router-link to="/funcionarios">Cadastrar Funcionario</router-link></li>
      <li><router-link to="/itens">Cadastrar Itens</router-link></li>
    </ul>
    <div >
    </div>
  </div>


</template>

<style scoped>
.sidebar {
  height: 100vh;
  background-color: #379e3c;
  color: white;
  max-width: 20vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
}

ul {
  list-style: none;
  padding: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
  gap: 0.2rem;
  width: 100%;
}

a {
  text-decoration: none;

  color: #ffff;
}

li {
  padding: 1em 0;
  width: 100%;
  cursor: pointer;
  transition: background-color 0.3s;
  display: flex;
  justify-content: center;
}

li:hover {
  background-color: #0f2c11;
  color: #ffff;
}

.cabecalho-sidebar {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100%;
  border-bottom: 1px solid #ffff;
}

.titulo {
  font-size: 1.5em;
  font-weight: bold;
  text-align: center;
}

.logo {
  width: 4em;
  height: 4em;
  border-radius: 4em;
  margin-bottom: 1em;
  margin: 1em;
}
</style>
