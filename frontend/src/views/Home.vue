<template>
  <div class="home">
    <router-link class="signinLink" to="/all-conversations">
      <div class="messaging">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g id="chat_bubble_outline_24px">
          <path id="icon/communication/chat_bubble_outline_24px" fill-rule="evenodd" clip-rule="evenodd" d="M4 2H20C21.1 2 22 2.89999 22 4V16C22 17.1 21.1 18 20 18H6L2 22V4C2 2.89999 2.90002 2 4 2ZM6 16H20V4H4V18L6 16Z" fill="white"/>
          </g>
        </svg>
      </div>
    </router-link>
    <header>
        <div class="header__homepage">
            <h1>Bonjour</h1>
            <div class="dropdown">
            <button class="dropbtn">Options</button>
            <div class="dropdown-content">
            <p v-on:click="disconnect()">Déconnexion</p>
            <p class="important" v-on:click="deleteAccount()">Supprimer le compte</p>
            </div>
            </div>
        </div>
    </header>
    <main class="body__homepage">
        <div class="profil">
            <p class="profil__email bold">{{ email }}</p>
        </div>
        <div class="choice__section">
        <router-link class="signinLink" to="/all-articles"><button>Accèder aux articles</button></router-link>
        <router-link class="signinLink" to="/all-posts"><button>Accèder aux posts multimédia</button></router-link>
        </div>
    </main>
  </div>
</template>


<script>
import axios from 'axios';

export default({
data() {
        return {
            email: '',
        }
    },
    methods: {
      getUser() {
        axios.get("http://localhost:3000/api/user/" + localStorage.getItem('idUser'), {
              headers:{
                  'Authorization': 'Bearer ' + localStorage.getItem('token')
              }
          })
          .then((response) => {
            this.email = response.data[0].email;
          })
      },
      disconnect() {
        localStorage.clear();
        this.$router.push('/login');
      },
      deleteAccount() {
        axios.delete("http://localhost:3000/api/user/delete/", {
              headers:{
                  'Authorization': 'Bearer ' + localStorage.getItem('token')
              }
          })
          .then(() => {
            localStorage.clear();
            this.$router.push('/signup');
          })
      },
    },
    beforeMount(){
            this.getUser();
        }
    })
</script>

<style scoped>
.messaging {
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

.messaging svg {
    height: 20px;
    width: 20px;
}
  
.important {
    color: #FD2D01;
  }
.signinLink {
color: white;
width: 100%;
}

.dropbtn {
    padding: 8px 16px;
}

.dropdown-content p {
  cursor: pointer;
}
.dropdown {
  position: relative;
  display: inline-block;
}

.dropdown-content {
  display: none;
  position: absolute;
  background-color: #f9f9f9;
  min-width: 200px;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  z-index: 1;
   right: 0;
}

.dropdown-content p {
  padding: 12px 16px;
  text-decoration: none;
  display: block;
}

.dropdown-content a:hover {background-color: #f1f1f1}

.dropdown:hover .dropdown-content {
  display: block;
}


</style>

