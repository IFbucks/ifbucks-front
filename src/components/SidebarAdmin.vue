  <script>
  
  </script>

 <template>
    <div class="sidebar">
    <div id="perfil-admin">
        administrador
    </div>
   <ul>
    <router-link to='/categorias'><li>Cadastrar Categoria</li></router-link>
    <li>Cadastrar Funcionário</li>
    <li>Cadastrar Item</li>
   </ul>
        
    </div>
  </template>
  
  
  <style scoped>
  .sidebar {
    width: 300px;
    background-color: #379E3C;
    color: black;
    height: 100vh;
  }
  
  ul {
    list-style: none;
    padding: 0;
  }
  
  li {
    padding: 15px;
    margin: 15px;
    cursor: pointer;
    border-radius: 18px;
    transition: background-color 0.3s;
  }
  
  li:hover {
    background-color: #0F2C11;
    color: #ffff;
  }
  #perfil-admin{
    display: flex;
    align-items: center;
    justify-content: center;
    padding-top: 25px;
  }
  </style>
  