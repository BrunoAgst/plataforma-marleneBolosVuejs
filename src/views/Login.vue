<template>
    <div>
        <h1>Login</h1>
        <form>
            <label id="emailL">Email: </label><br>
            <input type="email" id="email" placeholder="Digite o seu email" v-model="email"/><br>
            <label id="senhaL">Senha: </label><br>
            <input type="password" id="senha" placeholder="Digite a senha" v-model="senha"/><br>
            <button id="btentrar" @click="login">Entrar</button><br>
            <a @click="verificaEmail(email)">Esqueceu sua senha?</a>
        </form>
    </div>
</template>

<script>
import axios from 'axios';
export default {
   
    data(){
        return{
            email: '',
            senha: '',
            url: process.env.VUE_APP_API_URL
        }

    },
    methods:{
        login(event){
            event.preventDefault();

            var usuario = {
                email: this.email,
                senha: this.senha
            }

            axios.post(`${this.url}/v1/login`, usuario).then(res => {
                localStorage.setItem('token', res.data.sucesso.token);
                this.$router.push({name: 'Inicio'});
            }).catch(err => {
                console.log(err);
                alert('Erro, campos inválidos verifique novamente');
            });
        },
        verificaEmail(email){
            if(email.length <= 0){
                alert("Digite um email");
                this.$router.push('Login');
                return
            }

            axios.post(`${this.url}/v1/reset-senha`, {"email": email}).then(() => {
                alert('Enviamos um e-mail com um token para recuperacao da senha');
                this.$router.push({ name: 'RecuperacaoSenha', params: {email: email}});
            }).catch(err => {
                console.log(err);
                this.$router.push('Login');
            });

        }
    }
}
</script>

<style scoped>
    label#emailL{
        margin-right: 262px;
    }

    label#senhaL{
        margin-right: 258px;
    }
    input{
        width: 300px;
        height: 20px;
        margin-bottom: 15px;
    }
    a{
        cursor: pointer;
    }
    h1{
        padding-top: 10%;
    }
    #btentrar{
        width: 150px;
        height: 30px;
        background: lightseagreen;
        color:  white;
        border: 0;
        border-radius: 4px;
        cursor: pointer;
        margin-bottom: 10px;
    }
</style>