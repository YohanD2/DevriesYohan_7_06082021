<template>
    <div class="home">
        <div class="alert-container" v-if="error != ''">
            <Alert :msg="error"/>
        </div>
        <h1>{{ post.title }}</h1>

        <img class="imgReaction" :src="post.url_img" />

        <h2>Réactions :</h2>
        <div class="comment" v-for="(reaction) in reactions" v-bind:key="reaction.id">
            <div class="comment__header">
                <p>{{ reaction.email }}</p>
            </div>
            <div class="comment__body">
                <img :src="reaction.url_img" />

            </div>
        </div>
        <form @submit.prevent="getFormValues" class="form__comment">
            <p class="infoText">Réagir :</p>

            <input ref="inputFile" @change="selectImg" type="file"
                id="avatar" name="avatar"
                accept="image/png, image/jpeg" required>
        <input type="submit" value="Réagir">
        </form>

    </div>
</template>

<script>

import axios from 'axios'
import Alert from '@/components/Alert.vue'

export default({
    data() {
        return {
            post: [],
            reactions: [],
            comment: '',
            error: '',
            selectedFile : null
        }
    },
    components: {
        Alert,
    },
    methods: {
        getPost() {
            this.error = '';

            let id = this.$route.params.id;
            axios.get("http://localhost:3000/api/post/" + id, {
                headers:{
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            })
             .then((response) => {
                this.post = response.data.post[0];
                this.reactions = response.data.reactions;
            })
        },
        
        
        getFormValues(){
            this.error = '';

            let data = new FormData();
                data.append('image', this.selectedFile, this.selectedFile.name)
                data.append('id_user', localStorage.getItem('idUser'));

                let id = this.$route.params.id;

                axios.post("http://localhost:3000/api/reaction/new/" + id, data, {
                    headers:{
                        'Content-Type' : 'multipart/form-data',
                        'Authorization': 'Bearer ' + localStorage.getItem('token'),
                    }
                })
                .then((response) => {
                    let reaction = {
                        email : response.data.email,
                        url_img : response.data.urlImg,
                    };
                    this.reactions.push(reaction);
                    this.$refs.inputFile.value = null;
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

.imgReaction {
    max-height: 200px;
}

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