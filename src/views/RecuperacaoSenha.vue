<template>
  <div>
      <form>
          <h1>Nova Senha</h1>
          <label id="senhal">Senha:</label><br>
          <input type="password" id="senha" placeholder="Digite a nova senha" v-model="senha"/><br>
          <label id="confirmaSenhal">Confirmar Senha:</label><br>
          <input type="password" id="confirmaSenha" placeholder="Digite novamente a senha" v-model="confirmaSenha"/><br>
          <label id="tokenl">Token:</label><br>
          <input id="token" placeholder="Digite o token" v-model="token" /><br>
          <button id="btAlterar" @click="alterarSenha" >Alterar</button>
      </form>
  </div>
</template>

<script>
import axios from 'axios';
export default {
    created(){
        this.email = this.$route.params.email;
    },
    data() {
        return {
            senha: '',
            confirmaSenha: '',
            token: '',
            email: '',
            url: process.env.VUE_APP_API_URL
        }
    },
    methods: {
        alterarSenha(event){
            event.preventDefault();

            var usuario = {
                "email": this.email,
                "senha": this.senha,
                "confirmarSenha": this.confirmaSenha,
                "token": this.token
            }

            axios.post(`${this.url}/nova-senha`, usuario).then(() => {
                alert('Senha alterada com sucesso');
                this.$router.push('Login');

            }).catch(err => {
                console.log(err);
                alert('Não foi possível alterar a senha');
            })
        }
    }
}
</script>

<style scoped>
    input{
        width: 300px;
        height: 20px;
        margin-bottom: 15px;
    }
    #btAlterar{
        width: 150px;
        height: 30px;
        background: lightseagreen;
        color:  white;
        border: 0;
        border-radius: 4px;
        cursor: pointer;
    }
    h1{
        padding-top: 10%;
    }
    label#senhal{
        margin-right: 258px;
    }
    label#confirmaSenhal{
        margin-right: 183px;
    }
    label#tokenl{
        margin-right: 260px;
    }

</style>