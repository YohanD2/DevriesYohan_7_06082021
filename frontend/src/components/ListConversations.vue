<template>
    <div class="hello">
        <router-link class="signinLink" to="/new/conversation">
        <div class="addBtn">
            <svg width="27" height="26" viewBox="0 0 27 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M13.5 1V25M1.5 12.7209H25.5" stroke="white" stroke-width="2" stroke-linecap="round"/>
            </svg>
        </div>
      </router-link>
        <h1>Liste des conversations</h1>
        <div class="conversations__container" v-for="(conversation, index) in conversations" v-bind:key="conversation.id">
            <router-link :to="{ name: 'GetConversation', params: { id: conversation.id }}">
                <div class="conversation">
                    <div class="conversation__avatar">                   
                        <p>{{ conversation.email }}</p>
                    </div>
                    <div class="conversation__action">
                        <svg  v-on:click.prevent="deleteConversation(conversation.id, index)" width="16" height="19" viewBox="0 0 16 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M8 2.61905H1.82353L1 5.04762H15L14.1765 2.61905H8ZM8 2.61905V1M1.41176 6.2619H14.5882L13.7647 18H8H2.23529L1.41176 6.2619ZM3.47059 7.47619H5.11765V16.381H3.88235L3.47059 7.47619ZM12.5294 7.47619H10.8824V16.381H12.1176L12.5294 7.47619ZM7.17647 7.47619H8.82353V16.381H7.17647V7.47619Z" stroke="#FD2D01" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                                
                    </div>
                </div>
            </router-link>
        </div>


    </div>
</template>

<script>
import axios from 'axios';

export default({
    data() {
        return {
            conversations: [],
            idUser: ''
        }
    },
    methods: {
        getUnits(){
            axios.get("http://localhost:3000/api/conversation/", {
                headers:{
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            })
            .then((response) => {
                this.conversations = response.data;
                this.idUser = localStorage.getItem('idUser');

                //this.conversations = (response.data[0]);
                /*
                let conversations = response.data[0];
                
                conversations.forEach(conversation => {
                    let id_user_to = conversation.id_user_to;

                    axios.get("http://localhost:3000/api/user/" + id_user_to, {
                        headers:{
                            'Authorization': 'Bearer ' + localStorage.getItem('token')
                        }
                    })
                    .then((response) => {
                        conversation.email = response.data[0].email;
                        console.log(response.data[0].email);
                    }, (err) => {
                            console.log(err);
                    })
                });
                console.log(conversations);
            this.conversations = conversations;
            */
            })
        },
        deleteConversation(idConversation, index) {
            axios.delete("http://localhost:3000/api/conversation/delete/" + idConversation, {
                headers:{
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            })
            .then((response) => {
                console.log(response);
                this.conversations.splice(index, 1);
            })
        }
    },
     beforeMount(){
        this.getUnits()
    },

    })
</script>

<style scoped>
.conversation {
            margin-top: 16px;
            background-color: white;
            border-radius: 5px;
            box-shadow: 0px 0px 16px rgba(0, 0, 0, 0.05);
            padding: 10px;
            display: flex;
            align-items: center;
            justify-content: space-between;
        }

        .conversation__avatar {
            display: flex;
            align-items: center;
        }
        .conversation__avatar p {
            margin-left: 8px;
            color: #6B5555;
            font-size: 12px;
        }

        .conversation__action svg {
           padding:8px;
        }

        .addBtn {
            position: fixed;
            bottom: 32px;
            right: 32px;
            height: 45px;
            width: 45px;
            background-color:#19233e;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 100%;
        }

        .addBtn svg {
            height: 20px;
            width: 20px;
        }
</style>
