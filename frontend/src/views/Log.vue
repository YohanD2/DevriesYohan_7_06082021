<template>
  <div class="home">
    <div v-if="this.$route.path == '/login'">
        <Login/>
    </div>
     <div v-if="this.$route.path == '/signup'">
        <Signup/>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Login from '@/components/Login.vue'
import Signup from '@/components/Signup.vue'

export default {
  name: 'Log',
  components: {
    Login,
    Signup,
  },
  mounted() {
  },
}


</script>
