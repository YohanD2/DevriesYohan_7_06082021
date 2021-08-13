<template>
    <div class="hello">
        <header>
        <img class="logo" src="../assets/logo_groupomania.png" alt="">
        </header>
        <main class='body'>
            <div class="alert-container" v-if="error != ''">
                <Alert :msg="error"/>
            </div>
            <h1>Incription</h1>
        <form @submit.prevent="getFormValues">
            <div class="inputLine">
                <label class="infoText">E-mail</label>
                <input name="email" type="text" required>
            </div>
            
            <div class="inputLine">
                <label class="infoText">Mot de passe</label>
                <input name="password" type="password" required>
            </div>
            <div class="inputLine">
                <input type="submit" value="S'inscrire">
            </div>
        </form>
        
        <router-link class="signinLink" to="/login">J'ai déjà un compte</router-link>
        </main>
    </div>
</template>
          
<script>

import axios from 'axios'
import Alert from '@/components/Alert.vue'

export default({
    data() {
        return {
            error: ''
        }
    },
    components: {
        Alert,
    },
    methods: {
        getFormValues(submitEvent){
            this.error = '';
            const user = {};
            user.email = submitEvent.target.elements.email.value;
            user.password = submitEvent.target.elements.password.value;

            axios.post("http://localhost:3000/api/auth/signup", user, {
                headers:{
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            })
            .then(() => {
                axios.post("http://localhost:3000/api/auth/login", user, {
                headers:{
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
                })
                .then((response) => {
                    console.log(response);
                    localStorage.setItem('token', response.data.token);
                    localStorage.setItem('idUser', response.data.idUser);
                    this.$router.push('/home');
                }, (err) => {
                    console.log(err);
                })
            }, (err) => {
                this.error = err.response.data;
            })
        },
    }
    })
</script>