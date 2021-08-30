<template>
    <div class="home">
        <div class="alert-container" v-if="error != ''">
            <Alert :msg="error"/>
        </div>
        <h1>Modification du post</h1>
        <form @submit.prevent="getFormValues">
            <div class="inputLine">
                <label  class="infoText">Titre</label>
                <input name="title" type="text" :value="post.title" required>
            </div>

            <div class="inputLine">
                <img :src="post.url_img" />
            </div>

            <label for="avatar">Changer l'image</label>

            <input ref="inputFile" @change="selectImg" type="file"
                id="avatar" name="avatar"
                accept="image/png, image/jpeg">

            <div class="inputLine">
                <input type="submit" value="Modifier le post">
            </div>
        </form>
    </div>
</template>
<script>
import Alert from '@/components/Alert.vue'
import axios from 'axios';
import {escapeHtml, validationText} from '@/validation';

export default({
    data() {
        return {
            post: [],
            error : '',
            selectedFile : null
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
            let idPost = this.$route.params.id;
            var post = {};
            let error = false;

            var title = escapeHtml(submitEvent.target.elements.title.value);
            let checkTitle = validationText(title);
             if(checkTitle == null) {
                error = true;
            } else {
                title = checkTitle;
            }

            if (error == false ) {

                if (this.selectedFile == null ) {
                post.title = title;
                axios.put("http://localhost:3000/api/post/modify/" + idPost, post, {
                        headers:{
                            'Authorization': 'Bearer ' + localStorage.getItem('token'),
                        }
                    })
                    .then((response) => {
                        console.log(response.data);
                        let idPost = response.data;
                        this.$router.push('/post/' + idPost);
                    }, (err) => {
                        this.error = err.response.data;
                    })

                } else {
                    console.log(title);
                    let data = new FormData();
                    data.append('image', this.selectedFile, this.selectedFile.name)
                    data.append('title', title)

                    axios.put("http://localhost:3000/api/post/modify/" + idPost, data, {
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
                }

            } else {
                this.error = "Veuillez entrer du text valide";
            }
        },
         getPost() {
            let id = this.$route.params.id;
            axios.get("http://localhost:3000/api/post/" + id, {
                headers:{
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            })
            .then((response) => {
                this.post = response.data.post[0];

            }, (err) => {
                this.error = err.response.data;
            })
        },

        selectImg(event) {
            this.selectedFile = event.target.files[0]; 
        },
    },
    beforeMount(){
        this.getPost();
    },
})
</script>

<style scoped>

</style>