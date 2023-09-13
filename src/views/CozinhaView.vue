<script setup>
//import SidebarCozinha from "../components/SidebarCozinha.vue"



const isAdmin = true

</script>

<template>
 <!--<SidebarCozinha/>-->   
    <button v-if="isAdmin" @click="$router.push({name: 'itens'})">Admin</button>
    <p>oi</p>
</template>