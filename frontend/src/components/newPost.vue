<template>
    <div class="home">
        <div class="alert-container" v-if="error != ''">
            <Alert :msg="error"/>
        </div>
        <h1>Création du post</h1>
        <form @submit.prevent="getFormValues">
            <div class="inputLine">
                <label  class="infoText">Titre</label>
                <input name="title" type="text" required>
            </div>
            
            <label for="avatar">Ajouter une image</label>

            <input ref="inputFile" @change="selectImg" type="file"
                id="avatar" name="avatar"
                accept="image/png, image/jpeg">

            <div class="inputLine">
                <input type="submit" value="Créer le post">
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

              let post = {};
                post.title = submitEvent.target.elements.title.value;
                post = JSON.stringify(post);

                let data = new FormData();
                data.append('image', this.selectedFile, this.selectedFile.name)
                data.append('content', post)

                axios.post("http://localhost:3000/api/post/new", data, {
                    headers:{
                        'Content-Type' : 'multipart/form-data',
                        'Authorization': 'Bearer ' + localStorage.getItem('token'),
                    }
                })
                .then((response) => {
                    let idPost = response.data;
                    this.$router.push('/post/' + idPost);
                }, (err) => {
                    this.error = err.response.data;
                })
        },
        selectImg(event) {
            this.selectedFile = event.target.files[0]; 
        },
    },
    

    })
</script>