<script setup>
import SidebarAdmin from "../components/SidebarAdmin.vue";

</script>
<template>
    <div class="container">
        <sidebar-admin />
        <router-view />
    </div>    
</template>

<style scoped> 
.container {
    width: 100vw;
    min-height: 100vh;
    display: flex;
    flex-direction: row;
}
</style>