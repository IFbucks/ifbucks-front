<script setup>

const isAdmin = false

</script>

<template>
    <h1>Cozinha</h1>
    <button v-if="isAdmin" @click="$router.push({name: 'itens'})">Admin</button>
</template>