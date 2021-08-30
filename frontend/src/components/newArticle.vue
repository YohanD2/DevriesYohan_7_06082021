<template>
    <div class="home">
        <div class="alert-container" v-if="error != ''">
            <Alert :msg="error"/>
        </div>
        <h1>Création de l'article</h1>
        <form @submit.prevent="getFormValues">
            <div class="inputLine">
                <label  class="infoText">Titre</label>
                <input name="title" type="text" required>
            </div>
            
            <div class="inputLine">
                <label class="infoText" for="story">Contenu de l'article</label>
                <textarea name="content" id="story"
                        rows="5" cols="33" required>
                </textarea>
            </div>
            <div class="inputLine">
                <input type="submit" value="Créer l'article">
            </div>
        </form>
        {{ title }}
    </div>
</template>
<script>
import Alert from '@/components/Alert.vue'
import axios from 'axios';
import {escapeHtml, validationText} from "@/validation";

export default({
    data() {
        return {
            title: '',
            error : ''
        }
    },
    components: {
        Alert,
    },
    methods: {
        escapeHtml,
        validationText,
        getFormValues(submitEvent){
            this.error = '';
            const article = {};
            let error = false;

            let title = escapeHtml(submitEvent.target.elements.title.value);
            let content = escapeHtml(submitEvent.target.elements.content.value);

            let checkTitle = validationText(title);
             if(checkTitle == null) {
                error = true;
            } else {
                article.title = checkTitle;
            }

            let checkContent = validationText(content);
             if(checkContent == null) {
                error = true;
            } else {
                article.content = checkContent;
            }

            if ( error == false ) {
                article.id_user = localStorage.getItem('idUser');
                axios.post("http://localhost:3000/api/article/new", article, {
                    headers:{
                        'Authorization': 'Bearer ' + localStorage.getItem('token')
                    }
                })
                .then((response) => {
                    this.$router.push('/article/' + response.data.id);

                }, (err) => {
                    this.error = err.response.data;
                })
            } else {
                this.error = "Veuillez entrer du text valide";
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