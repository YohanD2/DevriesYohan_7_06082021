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
                        rows="5" cols="33">
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
        getFormValues(submitEvent){
            this.error = '';

            const article = {};
            article.title = submitEvent.target.elements.title.value;
            article.content = submitEvent.target.elements.content.value;

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