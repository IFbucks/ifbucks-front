<template>
  <div></div>
</template>

<script>

import axios from 'axios'
export default {
    data() {
        return {
            mesas: []
        }
    },

    methods: {
        getMesas(id) {
            axios.get(`http://localhost:8000/pedidos/${id}`)
                .then((response) => {
                    this.mesas = response.data
                })
                .catch((error) => {
                    console.log(error)
                })
        }
    },

    mounted() {
        this.getMesas()
    }

}
</script>

<style>

</style>