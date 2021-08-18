<template>
    <div class="home">
        <div class="alert-container" v-if="error != ''">
            <Alert :msg="error"/>
        </div>
        <h1>{{ article.title }}</h1>

        <p>{{ article.content }}</p>

        <h2>Commentaires :</h2>
        <div class="comment" v-for="(comment) in comments" v-bind:key="comment.id">
            <div class="comment__header">

                
                <p>{{ comment.email }}</p>
            </div>
            <div class="comment__body">
                <p class="infoText">{{ comment.content }}</p>
            </div>
        </div>
        <form @submit.prevent="getFormValues" class="form__comment">
            <p class="infoText">Commentaire</p>
            <input name="comment" type="text">
        <input type="submit" value="Poster">
        </form>
    </div>
</template>

<script>

import axios from 'axios'
import Alert from '@/components/Alert.vue'


export default({
    data() {
        return {
            article: [],
            comments: [],
            comment: '',
            error: ''
        }
    },
    components: {
        Alert,
    },
    methods: {
        getArticle() {
            let id = this.$route.params.id;
            axios.get("http://localhost:3000/api/article/" + id, {
                headers:{
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            })
             .then((response) => {
                 console.log(response);
                this.article = response.data.article[0];
                this.comments = response.data.comments;
            })
            
        },
        getFormValues(submitEvent){
            this.error = '';

            const comment = {};
            comment.content = submitEvent.target.elements.comment.value;
            let idArticle = this.$route.params.id;

            axios.post("http://localhost:3000/api/comment/new/" + idArticle, comment, {
                headers:{
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            })
            .then((response) => {

                let comment = {
                    content : response.data.content,
                    email : response.data.email,
                };

                this.comments.push(comment);
                this.comment = '';
               // this.$router.push('/article/' + response.data.id);

            }, (err) => {
                this.error = err.response.data;
            })
        },
    },
    
     beforeMount(){
        this.getArticle()
    },

    })
</script>
<style scoped>
.form__comment input {
    width: 100%;
    box-sizing: border-box;
}
.comment {
            width: 100%;
            background-color: white;
            border-radius: 5px;
            box-shadow: 0px 0px 16px rgba(0, 0, 0, 0.05);
            display: flex;
            flex-direction: column;
            padding: 8px;
            box-sizing: border-box;
            margin-top: 10px;
        }

      .comment__header{
          display: flex;
          align-items: center;
          padding-bottom: 8px;
          border-bottom: 1px solid lightgrey;
      }

      .comment__header p {
          margin-left: 8px;
        color: #6B5555;
        font-size: 12px;
      }
</style>