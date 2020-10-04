<template>
    <div>
        <h1>Registrar pedido</h1>
        <form>
            <label id="nomel">Nome: </label><br>
            <input type="text" id="nome" placeholder="Digite o nome do cliente" v-model="nome"/><br>
            <label id="produtosl">Produtos: </label><br>
            <textarea id="produtos" placeholder="Digite os produtos" v-model="produtos"></textarea><br>
            <label id="valorl" >Valor: </label><br>
            <input type="text" id="valor" placeholder="Digite o valor total do pedido" v-model="valor"/><br>
            <button id="btregistrar" @click="registrar">Registrar</button>
        </form>
    </div>
</template>

<script>
import axios from 'axios';
export default {
    data(){
        return{
            nome: '',
            produtos: '',
            valor: ''
        }
    },
    methods:{
        registrar(event){
            event.preventDefault();
            var pedido = {
                nome: this.nome,
                produtos: this.produtos,
                valor: this.valor
            };

            axios.post('http://18.191.133.203:3000/v1/pedidos', pedido).then(() => {
                alert('Pedido cadastrado com sucesso');
                window.location.reload(true);
                return
            }).catch(err => {
                console.log(err);
                alert('Erro, campos inválidos verifique novamente');
            });
        
        }
    }
}
</script>

<style scoped>
    label#nomel{
        margin-right: 262px;
    }
    label#produtosl{
        margin-right: 242px;
    }
    label#valorl{
        margin-right: 267px;
    }
    input{
        width: 300px;
        height: 20px;
        margin-bottom: 15px;
    }
    #produtos{
        width: 302px;
        padding-bottom: 50px;
        margin-bottom: 10px;
    }
    #btregistrar{
        width: 150px;
        height: 30px;
        background: lightseagreen;
        color:  white;
        border: 0;
        border-radius: 4px;
        cursor: pointer;
    }

</style>
