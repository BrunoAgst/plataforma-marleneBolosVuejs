<template>
    <div>
        <Navbar/>
        <div>
            <select id="mes" v-model="mesF">
                <option disabled value="">Escolha um mês</option>
                <option v-for="mes in mesesF" :key="mes.id">{{mes.nome}}</option>
            </select>
            <a id="btFiltro" @click="valorMes()">Filtrar</a>
        </div>
        <h1>{{mes}}</h1>
        <p>Faturamento: R$ {{valor}}</p>
    </div>
</template>

<script>
import Navbar from '../components/Nav';
import axios from 'axios';

export default { 
    created(){

        this.request = {
            headers: {
                Authorization: "Bearer " + localStorage.getItem('token')
            }
        }  
        axios.get(`${this.url}/v1/total-mensal`, this.request).then(res => {
                this.dados = res.data.listaValores;
                this.valorTotal(this.dados);
                this.pegarMes();
                
            }).catch(err => {
                console.log(err);
        });

        this.mesesF = [
            {
                id: 0,
                nome: 'Janeiro'
            },
            {
                id: 1,
                nome: 'Fevereiro'
            },
            {
                id: 2,
                nome: 'Março'
            },
            {
                id: 3,
                nome: 'Abril'
            },
            {
                id: 4,
                nome: 'Maio'
            },
            {
                id: 5,
                nome: 'Junho'
            },
            {
                id: 6,
                nome: 'Julho'
            },
            {
                id: 7,
                nome: 'Agosto'
            },
            {
                id: 8,
                nome: 'Setembro'
            },
            {
                id: 9,
                nome: 'Outubro'
            },
            {
                id: 10,
                nome: 'Novembro'
            },
            {
                id: 11,
                nome: 'Dezembro'
            }
        ]
    },
    data(){
        return{
            dados: [],
            mesesF: [],
            valor: 0,
            data: new Date,
            mes: '',
            mesF: '',
            url: process.env.VUE_APP_API_URL,
            request: ''
        }
    },
    components: {
        Navbar
    },
    methods:{
        valorMes(){
            var mes = this.mesF;
            var numero = -1;
            var valor = 0;
            var data = new Date;

            switch(mes){
                case 'Janeiro':
                    numero = 0;
                    break;
                case 'Fevereiro':
                    numero = 1;
                    break;
                case 'Março':
                    numero = 2;
                    break;
                case 'Abril':
                    numero = 3;
                    break;
                case 'Maio':
                    numero = 4;
                    break;
                case 'Junho':
                    numero = 5;
                    break;
                case 'Julho':
                    numero = 6;
                    break;
                case 'Agosto': 
                    numero = 7;
                    break;
                case 'Setembro':
                    numero = 8;
                    break;
                case 'Outubro':
                    numero = 9;
                    break;
                case 'Novembro':
                    numero = 10;
                    break;
                default: 
                    numero = 11;
            }
        
            axios.get(`${this.url}/v1/pedidos-mensal/${numero}/${data.getFullYear()}`, this.request).then(res => {
                for(var i = 0; i < res.data.length; i++){
                    valor += res.data[i]
                }
                this.mes = mes;
                this.valor = valor;
                
            }).catch(err => {
                console.log(err);
            });
        },
        valorTotal(array){
            for(var i = 0; i < array.length; i++){
                this.valor += array[i]
            }
        },
        pegarMes(){
            var mes = this.data.getMonth();

            switch(mes){
                case 0:
                    this.mes = 'Janeiro';
                    break;
                case 1:
                    this.mes = 'Fevereiro';
                    break;
                case 2:
                    this.mes = 'Março';
                    break;
                case 3:
                    this.mes = 'Abril';
                    break;
                case 4:
                    this.mes = 'Maio';
                    break;
                case 5:
                    this.mes = 'Junho';
                    break;
                case 6:
                    this.mes = 'Julho';
                    break;
                case 7: 
                    this.mes = 'Agosto';
                    break;
                case 8:
                    this.mes = 'Setembro';
                    break;
                case 9:
                    this.mes = 'Outubro';
                    break;
                case 10:
                    this.mes = 'Novembro';
                    break;
                default: 
                    this.mes = 'Dezembro';
            }
        }
    }
}
</script>

<style scoped>
    #btFiltro{
        cursor: pointer;;
        border: 1px solid black;
        padding: 3px;
        margin-left: 5px;
        background-color:lightseagreen;
        color: white;
        border-radius: 4px;
    }

    #mes{
        height: 23px
    }
</style>