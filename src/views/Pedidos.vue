<template>
    <div>
        <h1 id="titulo">Pedidos</h1>
        <div id="bloco" v-for="pedido in itensPagina" :key="pedido.id">
            <h3 id="nome">Nome: {{pedido.nome}}</h3>
            <label id="pedidol">Pedido:</label>
            <xmp id="pedido">{{pedido.produtos}}</xmp>
            <h4 id="valor">Valor: R$ {{pedido.valor}}</h4>
            <h4 id="data">Data: {{converteData(pedido.data)}}</h4>
            <a id="btExcluir" @click="excluirPedido(pedido.id)">Excluir</a>
        </div>
        <div>
            <jw-pagination :items="dados" @changePage="mudarPagina" :labels="customizarBotao"></jw-pagination>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

const customizarBotao = {
    first: 'Primeira página',
    last: 'Ultima página',
    previous: '<',
    next: '>'
};

export default {
    created(){
        axios.get("http://18.191.133.203:3000/v1/pedidos").then(res => {
            this.dados = res.data.pedidos;
        }).catch(err => {
            console.log(err);
        });
    },
    data(){
        return{
            dados: [],
            itensPagina: [],
            customizarBotao
        }
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
            var response = await axios.delete(`http://18.191.133.203:3000/v1/pedidos/${idPedido}`);
            
            if(response.status !== 200){
                alert("Não foi possível excluir esse pedido");
                return
            }
            
            window.location.reload(true);
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
        background-color: red;
        color: white;
    }
   
</style>