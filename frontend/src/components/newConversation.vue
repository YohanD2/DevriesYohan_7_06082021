<template>
    <div class="home">
        <div class="alert-container" v-if="error != ''">
                <Alert :msg="error"/>
            </div>
        <h1>Création de la conversation</h1>
        <!-- <h1>Modificationn de l'article</h1> -->
        <form @submit.prevent="getFormValues">
            <div class="inputLine">
                <label  class="infoText">Email de votre correspondant</label>
                <input name="email" type="email" required>
            </div>

            <div class="inputLine">
                <label class="infoText" for="story">Vore message</label>
                <textarea name="content" id="story"
                        rows="5" cols="33" required>
                </textarea>
            </div>
            <div class="inputLine">
                <input type="submit" value="Envoyer le message">
            </div>
        </form>
    </div>
</template>
<script>
import axios from 'axios';
import Alert from '@/components/Alert.vue';
import {escapeHtml, validationEmail, validationText} from "@/validation";


export default({
    data() {
        return {
            id_user_by: '',
            error : ''
        }
    },
    components: {
        Alert,
    },
    methods: {
        escapeHtml,
        validationEmail,
        validationText,
        getFormValues(submitEvent){
            this.error = '';
            let error = false;

            let email = escapeHtml(submitEvent.target.elements.email.value);          
            const conversation = {};


            var checkEmail = validationEmail(email);
             if(checkEmail == null) {
                error = true;
            } else {
                conversation.email = checkEmail;
            }

            if (error == false) {
                conversation.id_user_by = localStorage.getItem('idUser');

                axios.post("http://localhost:3000/api/conversation/new", conversation, {
                    headers:{
                        'Authorization': 'Bearer ' + localStorage.getItem('token')
                    }
                })
                .then((response) => {
                    
                    let content = escapeHtml(submitEvent.target.elements.content.value);
                    var checkContent = validationText(content);
                    const message = {};
                    if(checkContent == null) {
                        error = true;
                    } else {
                        message.content = checkContent;
                    }

                    if (error == false) {
                        message.id_conversation = response.data;
                        message.id_user_by = localStorage.getItem('idUser');

                        axios.post("http://localhost:3000/api/message/new", message , {
                            headers:{
                                'Authorization': 'Bearer ' + localStorage.getItem('token')
                            }
                        })

                        .then(() => {
                            this.$router.push('/conversation/' + message.id_conversation);
                        }, (err) => {
                            this.error = err.response.data;
                        })
                    } else {
                        this.error = "Veuillez entrer du text valide";
                    }
                }, (err) => {
                    this.error = err.response.data;
                })
            } else {
                this.error = "Veuillez entrer une e-mail valide";
            }

            
        },
    }

    })
</script>

<style scoped>
textarea{
          border: 1px solid #19233e;
          border-radius: 5px;
          max-width:100%;
          min-width:100%;
          max-height: 260px;
          box-sizing: border-box;
      }
</style>