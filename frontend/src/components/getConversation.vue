<template>
    <div>
        <div class="alert-container" v-if="error != ''">
            <Alert :msg="error"/>
        </div>
         <h1>Chat avec :</h1>
        <div class="profil">
            <p class="profil__email bold">{{ email }}</p>
        </div>
        <h2>Votre conversation :</h2>
        <div class="chat">
            <div :class="{ 'me' : message.id_user_by == idUser}" class="message" v-for="(message) in messages" v-bind:key="message.id">
                <div class="alert-container" v-if="message.url_img != null">
                    <img :src="message.url_img" />              
                </div>
                <p :class="{ 'myMessage' : message.id_user_by == idUser}">{{ message.content }}</p>
            </div>
        </div>
        <form @submit.prevent="getFormValues" class="form__message">
            <p class="infoText">Message</p>
            <input v-model="content" name='content' type="text">
            <label for="avatar">Ajouter une image</label>

            <input ref="inputFile" @change="selectImg" type="file"
                id="avatar" name="avatar"
                accept="image/png, image/jpeg">

            <input type="submit" value="Envoyer">
        </form>
    </div>
    
</template>
<script>

import axios from 'axios'
import Alert from '@/components/Alert.vue'

export default({
    data() {
        return {
            messages : [],
            id: '',
            email: '',
            idUser: '',
            content: '',
            error: '',
            selectedFile : null
        }
    },
    components: {
        Alert,
    },
    methods: {
        getMessages() {
            let id = this.url_data=this.$route.params.id;
            this.id = id;
            this.idUser = localStorage.getItem('idUser');
            axios.get("http://localhost:3000/api/conversation/" + id, {
                headers:{
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            })
             .then((getConversation) => {


                if (localStorage.getItem('idUser') != getConversation.data.conversation[0].id_user_by && localStorage.getItem('idUser') != getConversation.data.conversation[0].id_user_to) {
                    this.$router.push('/all-conversations')
                 }

                this.email = getConversation.data.conversation[0].email;
                this.messages = getConversation.data.messages
            })
            
        },
        getFormValues(submitEvent){

            let message = {};
            message.id_conversation = this.id;
            message.content = submitEvent.target.elements.content.value;
            message.id_user_by = localStorage.getItem('idUser');

            if ( this.selectedFile == null ) {

                axios.post("http://localhost:3000/api/message/new", message, {
                    headers:{
                        'Authorization': 'Bearer ' + localStorage.getItem('token'),
                    }
                })
                .then((response) => {

                    let message = {
                        content : response.data.content,
                        id : response.data.id,
                        id_user_by : response.data.id_user_by,
                        id_conversation : response.data.id_conversation,
                        urlImg : response.data.urlImg,
                    };

                    this.messages.push(message);
                    this.content = '';
                    
                }, (err) => {
                    this.error = err.response.data;
                })

            } else {
                message = JSON.stringify(message);

                let data = new FormData();
                data.append('image', this.selectedFile, this.selectedFile.name)
                data.append('content', message)

                axios.post("http://localhost:3000/api/message/new", data, {
                    headers:{
                        'Content-Type' : 'multipart/form-data',
                        'Authorization': 'Bearer ' + localStorage.getItem('token'),
                    }
                })
                .then((response) => {
                    let message = {
                        content : response.data.content,
                        id : response.data.id,
                        id_user_by : response.data.id_user_by,
                        id_conversation : response.data.id_conversation,
                        url_img : response.data.urlImg,
                    };

                    this.messages.push(message);
                    this.content = '';
                    this.$refs.inputFile.value=null                   
                }, (err) => {
                    this.error = err.response.data;
                })
            }
            
        },
        selectImg(event) {
            this.selectedFile = event.target.files[0]; 
        },
        
    },
    
     beforeMount(){
        this.getMessages();
    },
    })
</script>

<style scoped>
html .me {
    background-color: #FF7B5F;
}
.chat {
    display: flex;
    flex-direction: column;
}
.message {
    background-color: white;
    border-radius: 5px;
    box-shadow: 0px 0px 16px rgba(0, 0, 0, 0.05);
    flex-shrink: 1;
    margin-top: 8px;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    padding: 4px;
    word-wrap: break-word;
}

.message p {
    margin: 0;
    width: 100%;
}
.message img {
    width: 50px;
    height: 50px;
}
.myMessage {
    text-align: right;
}
.form__message {
    margin-top: 32px;
}

.form_message input[type=text] {
    margin-bottom: 8px;
}
.form__message input {
    width: 100%;
    box-sizing: border-box;
}

.form__message button {
    margin-top: 16px;
}
</style>