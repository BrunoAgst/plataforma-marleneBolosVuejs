<template>
    <div>
        <h1>Setembro</h1>
        <p>Faturamento Atual: R$ {{valor}}</p>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    created(){
        axios.get("http://18.191.133.203:3000/v1/pedidos").then(res => {
                this.dados = res.data.pedidos;
                this.valorTotal(this.dados);
                
            }).catch(err => {
                console.log(err);
        });
    },
    data(){
        return{
            dados: [],
            valor: 0
        }
    },
    methods:{
        valorTotal(array){
            for(var i = 0; i < array.length; i++){
                this.valor += array[i].valor
            }
        }
    }
}
</script>

<style scoped>

</style>