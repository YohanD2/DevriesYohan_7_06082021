<template>
  <div id="app">
    <div id="nav">
      <!--
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
      -->
    </div>
    <router-view/>

<!--
    {{ token }}
    
    <button @click="change_token('nouveau token')">Add Month</button>
    -->
  </div>
</template>
<script>
/*

import { mapGetters, mapActions } from "vuex"

export default {
  
  computed: {
    ...mapGetters(["token"]),
  },
   
  methods: {
    ...mapActions(['change_token'])
  }
  
  
}
*/

</script>
<script>


export default({
     beforeMount(){
       
        if (this.$route.name != 'Log' && this.$route.name != 'Signup' ) {
          if (!localStorage.getItem('token')) {
                this.$router.push('/login')
            }
        }
        
    },

    })
</script>
<style>

 .header__list {
            width: 100%;
            padding: 30px;
        }

        h2 {
            font-size: 16px;
          font-weight: bold;  
        }
        
  a {
    color: #19233e;
    text-decoration: none;
  }
  
  button {
    background-color: #19233e;
    color: white;
    text-transform: uppercase;
    border: 1px solid #19233e;
    border-radius: 5px;
    width: 100%;
    height: 40px;
  }
  .infoText {
    color: #6B5555;
    font-size: 14px;
  }
  .bold {
    font-weight: bold;
  }
  html{
    background-image: url('./assets/background.jpg');
    background-size: cover;
    font-family: 'Roboto', sans-serif;
  }
  html h1 {
    font-size: 22px;
    font-weight: bold;
  }
  html p{
    font-size: 18px;
    color: #292424;
  }

  header {
        display: flex;
        justify-content: center;
    }
    header img {
        margin-top: 40px;
        margin-bottom: 40px;
    }
    body{
        margin: 0px;
        padding: 0px;
    }
    .body {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin: 30px;
    }
    form {
        width: 100%;
    }
    .inputLine {
        display: flex;
        flex-direction: column;
        margin-top: 24px;
    }
    label {
        margin-bottom: 8px;
    }
    input {
        height: 40px;
        border: 1px solid #19233e;
        border-radius: 5px;
    }
    input[type=submit] {
        margin-top: 24px;
        background-color: #19233e;
        color: white;
        text-transform: uppercase;
    }
    select {
        height:40px;
    }
    .signinLink {
        margin-top: 24px;
    }

    .header__homepage {
        width:100%;
        padding: 30px;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .body__homepage {
        margin: 30px;
    }
    .profil {
        display: flex;
        align-items: center;
    }
    .profil__email {
        margin-left: 8px;
        color: black;
    }

    .choice__section{
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-top: 40px;
    }
    .choice__section :nth-child(2) {
        margin-top: 16px;
    }
textarea{
          border: 1px solid #19233e;
          border-radius: 5px;
          max-width:100%;
          min-width:100%;
          max-height: 260px;
          box-sizing: border-box;
      }
@media screen and (min-width: 992px) {
  #app {
      display: flex;
      justify-content: center;
    }
    .home{
      width:60%;
    }
}
    
</style>
