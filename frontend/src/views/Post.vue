<template>
  <div class="home">
      <header>
        <div class="header__list">
          <router-link class="signinLink" to="/all-posts">Retour</router-link>            
        </div>
    </header>
    <main class="body__homepage">

      <div v-if="this.$route.path == '/new/post'">
          <newPost/>
      </div>
        <div v-if="this.$route.name == 'ModifyPost'">
          <modifyPost/>
      </div>
      <div v-if="this.$route.name == 'GetPost'">
        <getPost />
      </div>
    
</main>
  </div>
</template>

<script>
import newPost from '@/components/newPost.vue'
import modifyPost from '@/components/modifyPost.vue'
import getPost from '@/components/getPost.vue'

export default {
  name: 'Post',
  components: {
    newPost,
    modifyPost,
    getPost,
  }
}
</script>

<style>
img {
  max-width: 100%;
}
</style>

