<template>
        <div id="principal">
            <a id="btSair" @click="sair()">Sair</a>
            <br>
            <div id="nav">
                <router-link to="/">Inicio</router-link>
                <router-link to="/pedidos">Pedidos</router-link>
                <router-link to="/registrar">Registrar</router-link>
            </div>
        </div>
</template>

<script>
export default {
    methods: {
        sair(){
            localStorage.clear();
            window.location.reload(true);
        }
    }
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
    #btSair{
        cursor: pointer;
        margin-left: 80%;
        margin-top: 20px;
        border: 1px solid black;
        padding: 5px;
        background-color:lightseagreen;
        color: white;
        border-radius: 4px;
    }
    #principal{
        margin-top: 30px;
    }
</style>