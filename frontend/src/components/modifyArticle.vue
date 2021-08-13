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
                <textarea name="content" id="story" rows="5" cols="33" :value="article.content">
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
        getFormValues(submitEvent){
            this.error = '';
            const article = {};
            article.title = submitEvent.target.elements.title.value;
            article.content = submitEvent.target.elements.content.value;
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