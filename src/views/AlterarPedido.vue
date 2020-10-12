<template>
    <div>
        <Navbar/>
        <h1>Alterar pedido</h1>
        <form>
            <label id="nomel">Nome: </label><br>
            <input type="text" id="nome" placeholder="Digite o nome do cliente" v-model="nome"/><br>
            <label id="produtosl">Produtos: </label><br>
            <textarea id="produtos" placeholder="Digite os produtos" v-model="produtos"></textarea><br>
            <label id="valorl" >Valor: </label><br>
            <input type="text" id="valor" placeholder="Digite o valor total do pedido" v-model="valor"/><br>
            <button id="btalterar" @click="alterar">Alterar Pedido</button>
        </form>
    </div>
</template>

<script>
import axios from 'axios';
import Navbar from '../components/Nav';

export default {
    created(){

        var request = {
            headers: {
                Authorization: "Bearer " + localStorage.getItem('token')
            }
        }

        axios.get(`${this.url}/v1/pedidos/${this.$route.params.id}`, request).then(res =>{
            this.id = this.$route.params.id;
            this.nome = res.data.pedido[0].nome;
            this.produtos = res.data.pedido[0].produtos;
            this.valor = res.data.pedido[0].valor;
            
        }).catch(err => {
            console.log(err);
        });
    },
    data(){
        return{
            id: '',
            nome: '',
            produtos: '',
            valor: '',
            url: process.env.VUE_APP_API_URL
        }
    },
    components: {
        Navbar
    },
    methods: {
        alterar(event){
            event.preventDefault();
            var pedido = {
                nome: this.nome,
                produtos: this.produtos,
                valor: this.valor
            };

            var request = {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem('token')
                }
            }

            axios.put(`${this.url}/v1/pedidos/${this.id}`, pedido, request).then(() => {
                alert('Pedido alterado com sucesso');
                this.$router.push({ name: "Pedidos"});

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
    #btalterar{
        width: 150px;
        height: 30px;
        background: lightseagreen;
        color:  white;
        border: 0;
        border-radius: 4px;
        cursor: pointer;
        border-radius: 4px;
    }
</style>