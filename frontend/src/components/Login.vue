<template>
    <div class="hello">
        <header>
        <img class="logo" src="../assets/logo_groupomania.png" alt="">
        </header>
        <main class='body'>
            <div class="alert-container" v-if="error != ''">
                <Alert :msg="error"/>
            </div>
            <h1>Connexion</h1>
            <form @submit.prevent="getFormValues">
                <div class="inputLine">
                    <label class="infoText">E-mail</label>
                    <input name="email" type="email" required>
                </div>
                
                <div class="inputLine">
                    <label class="infoText">Mot de passe</label>
                    <input name="password" type="password" required>
                </div>
                <div class="inputLine">
                    <input type="submit" value="Se connecter">
                </div>
            </form>
            <router-link class="signinLink" to="/signup">S'inscrire</router-link>
        </main>
    </div>
</template>

<script>

import axios from 'axios'
import Alert from '@/components/Alert.vue'
import {escapeHtml, validationEmail, validationPassword} from "@/validation";


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
        escapeHtml,
        validationEmail,
        validationPassword,
        getFormValues(submitEvent){

            this.error = '';
            const user = {};

            let userEmail = escapeHtml(submitEvent.target.elements.email.value);
            let userPassword = submitEvent.target.elements.password.value;
            let error = false;

            let checkEmail = validationEmail(userEmail);
             if(checkEmail == null) {
                error = true;
            } else {
                user.email = userEmail;
            }

            let checkPassword = validationPassword(userPassword);
             if(checkPassword == null) {
                error = true;
            } else {
                user.password = checkPassword;
            }

            if (error == false) {
                axios.post("http://localhost:3000/api/auth/login", user)
                .then((response) => {
                    localStorage.setItem('token', response.data.token);
                    localStorage.setItem('idUser', response.data.idUser);
                    this.$store.commit("setAuthentication", true);
                    this.$store.commit("setRole", response.data.roleUser);
                    this.$router.push('/home')
                }, (err) => {
                    this.error = err.response.data;
                })
            } else {
                 this.error = "L'adresse e-mail ou le mot passe est incorrect"
            }
        },
    }
    })
</script>