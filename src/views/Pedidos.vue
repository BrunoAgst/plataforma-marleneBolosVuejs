<template>
    <div>
        <Navbar/>
        <h1 id="titulo">Pedidos</h1>
        <div id="bloco" v-for="pedido in itensPagina" :key="pedido.id">
            <h3 id="nome">Nome: {{pedido.nome}}</h3>
            <label id="pedidol">Pedido:</label>
            <xmp id="pedido">{{pedido.produtos}}</xmp>
            <h4 id="valor">Valor: R$ {{pedido.valor}}</h4>
            <h4 id="data">Data: {{converteData(pedido.data)}}</h4>
            <div id="bts">
                <router-link :to="{name: 'AlterarPedido', params: {id: pedido.id}}">
                    <a id="btAlterar">Alterar</a>
                </router-link>
                <a id="btExcluir" @click="excluirPedido(pedido.id)">Excluir</a>

            </div>
        </div>
        <div>
            <jw-pagination :items="dados" @changePage="mudarPagina" :labels="customizarBotao"></jw-pagination>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import Navbar from '../components/Nav';

const customizarBotao = {
    first: 'Primeira página',
    last: 'Ultima página',
    previous: '<',
    next: '>'
};

export default {
    created(){

        var request = {
            headers: {
                Authorization: "Bearer " + localStorage.getItem('token')
            }
        }

        axios.get(`${this.url}/v1/pedidos`, request).then(res => {
            this.dados = res.data.pedidos;
        }).catch(err => {
            console.log(err);
        });
    },
    data(){
        return{
            dados: [],
            itensPagina: [],
            customizarBotao,
            url: process.env.VUE_APP_API_URL
        }
    },
    components: {
        Navbar
    },
    methods: {
        converteData(timestamp){
            let data = new Date(timestamp);
            return `${data.getDate()}/${data.getUTCMonth() + 1}/${data.getUTCFullYear()}`;
        },
        mudarPagina(itensPagina) {
            this.itensPagina = itensPagina;
        },
        async excluirPedido(idPedido){
            var verifica = await confirm("Tem certeza que quer excluir esse pedido?");
            
            if(verifica === false){
                return
            }

            var request = {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem('token')
                }
            }

            var response = await axios.delete(`${this.url}/v1/pedidos/${idPedido}`, request);
            
            if(response.status !== 200){
                alert("Não foi possível excluir esse pedido");
                return
            }
            
            var atualizaPagina = await axios.get(`${this.url}/v1/pedidos`, request);

            this.dados = atualizaPagina.data.pedidos;
        }
    }
}
</script>

<style scoped>
    div#bloco{
        border: 1px solid black;
        width: 100%;
        margin: 0px;
        margin-bottom: 20px;
        padding-bottom: 20px;
    }
    
    #btExcluir{
        cursor: pointer;
        border: 1px solid black;
        padding: 5px;
        margin-bottom: 20px;
        margin-left: 10px;
        background-color: rgb(247, 70, 70);
        color: white;
        border-radius: 4px;
    }
     #btAlterar{
        cursor: pointer;
        border: 1px solid black;
        padding: 5px;
        margin-bottom: 20px;
        background-color: lightseagreen;
        color: white;
        text-decoration: none;
        border-radius: 4px;
    }
    a{  
        text-decoration: none;
    }
   
</style>