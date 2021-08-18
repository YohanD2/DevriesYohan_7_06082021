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
                <input name="user_id_to" type="text" required>
            </div>

            <div class="inputLine">
                <label class="infoText" for="story">Vore message</label>
                <textarea name="content" id="story"
                        rows="5" cols="33">
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
        getFormValues(submitEvent){
            this.error = '';

            this.id_user_by = submitEvent.target.elements.user_id_to.value;
            
            const conversation = {};
            conversation.id_user_by = localStorage.getItem('idUser');
            conversation.email = submitEvent.target.elements.user_id_to.value;

            axios.post("http://localhost:3000/api/conversation/new", conversation, {
                headers:{
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            })
            .then((response) => {
                
                const message = {};
                message.content = submitEvent.target.elements.content.value;
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
            }, (err) => {
                this.error = err.response.data;
            })
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