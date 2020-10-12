<template>
        <div id="nav">
            <router-link to="/">Inicio</router-link>
            <router-link to="/pedidos">Pedidos</router-link>
            <router-link to="/registrar">Registrar</router-link>
        </div>
</template>

<script>
export default {

}
</script>

<style scoped>
    #nav {
        padding: 30px;
    
    }

    #nav a {
        font-weight: bold;
        color: #2c3e50;
        margin-right: 10px;
        text-decoration: none;
    }

    #nav a.router-link-exact-active {
        color:lightseagreen;
    }
</style>