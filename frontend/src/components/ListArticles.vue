<template>
    <div class="hello">
        <router-link class="signinLink" to="/new/article">
            <div class="addBtn">
                <svg width="27" height="26" viewBox="0 0 27 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M13.5 1V25M1.5 12.7209H25.5" stroke="white" stroke-width="2" stroke-linecap="round"/>
                </svg>
            </div>
      </router-link>
        <h1>Liste des articles</h1>
        <div class="article__container" v-for="(article, index) in articles" v-bind:key="article.id">
            <router-link :to="{ name: 'GetArticle', params: { id: article.id }}">

                <div class="article">
                    <div class="article__header">
                        <h2>{{ article.title }}</h2>
                        
                        <div v-if="article.id_user == idUser" class="article__action">
                            <router-link :to="{ name: 'ModifyArticle', params: { id: article.id }}">
                                <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M9.65385 3.30769H1V16H12.5385V9.07692M14.8462 1L5.03846 11.3846L3.88462 13.6923L6.19231 12.5385L16 2.15385L14.8462 1Z" stroke="#19233E" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>
                            </router-link>
                            
                                <svg v-on:click.prevent="deleteArticle(article.id, index)" width="16" height="19" viewBox="0 0 16 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M8 2.61905H1.82353L1 5.04762H15L14.1765 2.61905H8ZM8 2.61905V1M1.41176 6.2619H14.5882L13.7647 18H8H2.23529L1.41176 6.2619ZM3.47059 7.47619H5.11765V16.381H3.88235L3.47059 7.47619ZM12.5294 7.47619H10.8824V16.381H12.1176L12.5294 7.47619ZM7.17647 7.47619H8.82353V16.381H7.17647V7.47619Z" stroke="#FD2D01" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>
                                                            
                        </div>
                    </div>
                    <div class="article__content">
                        <p>{{ article.content }}</p>
                    </div>
                    <div class="article__footer">
                        <div class="article__user">
                            <div class="article__user--img">
                                <img src="">
                            </div>
                            <p class="article__user--email">by {{ article.email }}</p>
                        </div>
                        <div class="article__comments">
                            <svg width="25" height="16" viewBox="0 0 25 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12.5882 1.0042C6.82944 0.969854 1.83948 0.975909 1.99998 8.27311C2.15869 15.4882 6.8942 15.015 12.5882 14.9829C18.2181 14.9512 23.3416 15.4069 23.5 8.27311C23.6599 1.07017 18.3042 1.03826 12.621 1.00439L12.5882 1.0042Z" stroke="#777777" stroke-width="2"/>
                                <path d="M9.46154 8.5C9.46154 7.67157 8.9105 7 8.23077 7C7.55103 7 7 7.67157 7 8.5C7 9.32843 7.55103 10 8.23077 10C8.9105 10 9.46154 9.32843 9.46154 8.5Z" stroke="#777777"/>
                                <path d="M14.2615 8.5C14.2615 7.67157 13.7105 7 13.0308 7C12.351 7 11.8 7.67157 11.8 8.5C11.8 9.32843 12.351 10 13.0308 10C13.7105 10 14.2615 9.32843 14.2615 8.5Z" stroke="#777777"/>
                                <path d="M19 8.5C19 7.67157 18.449 7 17.7692 7C17.0895 7 16.5385 7.67157 16.5385 8.5C16.5385 9.32843 17.0895 10 17.7692 10C18.449 10 19 9.32843 19 8.5Z" stroke="#777777"/>
                            </svg>
                            <p class="nbComments">{{ article.nbComment }} Commentaires</p>
                        </div>
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
            articles: [],
            idUser: ''
        }
    },
    methods: {
        getUnits(){
            axios.get("http://localhost:3000/api/article/", {
                headers:{
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            })
            .then((response) => {
                this.articles = response.data;
                //console.log(response.data[0]);
                this.idUser = localStorage.getItem('idUser');
            })
        },
        deleteArticle(idArticle, index) {
            axios.delete("http://localhost:3000/api/article/delete/" + idArticle, {
                headers:{
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            })
            .then(() => {
                this.articles.splice(index, 1);
            })
        
            
        }
        },
        beforeMount(){
            this.getUnits()
        },

    })
</script>

<style scoped>

        .article__container {
            display: flex;
            flex-direction: column;
        }
        .article {
            margin-top: 16px;
            background-color: white;
            border: 1px solid lightgrey;
            border-radius: 5px;
            padding: 16px;
            box-shadow: 0px 0px 16px rgba(0, 0, 0, 0.05);
        }
        .article__header {
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        .article__content {
            max-height: 150px;
            overflow: hidden;
            text-overflow: ellipsis;
        }

        .article__footer {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-top: 16px;
        }

        .article__user, .article__comments{
            display: flex;
            align-items: center;
        }

        .article__user--img {
            width: 20px;
            height: 20px;
            border: 1px solid lightgrey;
            border-radius: 5px;
        }

        .article__user--email, .nbComments {
            color: #6B5555;
            font-size: 12px;
            margin-left: 8px;
            overflow: hidden;
            text-overflow: ellipsis;
        }
        .article__user--email {
            max-width: 110px;
        }

        .nbComments {
            max-width: 90px;
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