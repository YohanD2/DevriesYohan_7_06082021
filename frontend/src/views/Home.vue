<template>
  <div class="home">
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
            <div class="profil__img">
                <img src="">
            </div>
            <p class="profil__email bold">{{ email }}</p>
        </div>
        <div class="choice__section">
        <router-link class="signinLink" to="/all-articles"><button>Accèder aux articles</button></router-link>
        <router-link class="signinLink" to="/all-conversations"><button>Accèder aux conversations</button></router-link>
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
        axios.delete("http://localhost:3000/api/user/delete/" + localStorage.getItem('idUser'), {
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

