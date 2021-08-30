<template>
    <div class="home">
        <div class="alert-container" v-if="error != ''">
            <Alert :msg="error"/>
        </div>
        <h1>Modification de l'article</h1>
        <form @submit.prevent="getFormValues">
            <div class="inputLine">
                <label  class="infoText">Titre</label>
                <input name="title" type="text" :value="article.title" required>
            </div>
            
            <div class="inputLine">
                <label class="infoText" for="story">Contenu de l'article</label>
                <textarea name="content" id="story" rows="5" cols="33" :value="article.content" required>
                </textarea>
            </div>
            <div class="inputLine">
                <input type="submit" value="Modifier l'article">
            </div>
        </form>
    </div>
</template>
<script>

import axios from 'axios';
import Alert from '@/components/Alert.vue'
import {escapeHtml, validationText} from '@/validation';


export default({
    data() {
        return {
            article: [],
            error: ''
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
                axios.put("http://localhost:3000/api/article/modify/" + this.$route.params.id, article, {
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
        getArticle() {
            let id = this.$route.params.id;
            axios.get("http://localhost:3000/api/article/" + id, {
                headers:{
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            })
            .then((response) => {
                this.article = response.data.article[0];

            }, (err) => {
                this.error = err.response.data;
            })
        }
    },
    
     beforeMount(){
        this.getArticle()
    },

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