<template>
  <div class="sidebar">
    <nav>
      <router-link v-for="item in sidebar_items" :key="item.to" :to="item.to">{{
        item.title
      }}</router-link>
    </nav>
  </div>
</template>

<script>
export default {
  name: 'SidebarComp',
  props: {
    sidebar_items: Array
  }
}
</script>

<style scoped>
.sidebar {
  height: 90vh;
  background-color: #e2e8f0;
  color: white;
  width: 100%;
  max-width: 20vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
}

nav {
  list-style: none;
  padding: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
  gap: 0.2rem;
  width: 100%;
  margin-top: 1em;

  overflow-y: scroll;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}

nav::-webkit-scrollbar {
  display: none;
}

a {
  padding: 1em 0;
  width: 90%;
  border-radius: 1em;
  cursor: pointer;
  transition: background-color 0.3s;
  display: flex;
  justify-content: center;
  text-decoration: none;
  color: #166534;
  font-size: 1.1em;
}

a:hover {
  background-color: #cbd5e1;
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
