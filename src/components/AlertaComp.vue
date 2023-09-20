<template>
  <div class="alerta" :class="tipo">
    {{ mensagem }}
    <button @click="fecharAlerta">Fechar</button>
  </div>
</template>

<script>
export default {
  name: 'AlertaComp',
  props: {
    tipo: {
      type: String,
      required: true
    },
    mensagem: {
      type: String,
      required: true
    },
    fecharAlerta: {
      type: Function,
      required: true
    },
    tempoExibicao: {
      type: Number, // Tempo em milissegundos
      default: 3000 // Valor padrão de 3 segundos
    }
  },
  mounted() {
    setTimeout(() => {
      this.fecharAlerta()
    }, this.tempoExibicao)
  }
}
</script>

<style scoped>
.sucesso {
  padding: 20px;
  color: white;
  margin-bottom: 15px;
  background: #f1f1f1;
  width: 100%;
  border-radius: 1em;
  padding: 2em 3em;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #4caf50;
}

.erro {
  padding: 20px;
  color: white;
  margin-bottom: 15px;
  background: #f1f1f1;
  width: 100%;
  border-radius: 1em;
  padding: 2em;

  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #f44336;
}

button {
  margin-top: 10px;
  padding: 10px 20px;
  border-radius: 5px;
  border: none;
  background-color: #00000029;
  color: white;
  cursor: pointer;
}

button:hover {
  background-color: #00000019;
}
</style>
