<template>
    <div>
        <Navbar/>
        <h1>{{mes}}</h1>
        <p>Faturamento Atual: R$ {{valor}}</p>
    </div>
</template>

<script>
import Navbar from '../components/Nav';
import axios from 'axios';



export default { 
    created(){

        var request = {
            headers: {
                Authorization: "Bearer " + localStorage.getItem('token')
            }
        }  
        axios.get(`${this.url}/v1/total-mensal`, request).then(res => {
                this.dados = res.data.listaValores;
                this.valorTotal(this.dados);
                this.pegarMes();
                
            }).catch(err => {
                console.log(err);
        });
    },
    data(){
        return{
            dados: [],
            valor: 0,
            data: new Date,
            mes: '',
            url: process.env.VUE_APP_API_URL
        }
    },
    components: {
        Navbar
    },
    methods:{
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
    
</style>