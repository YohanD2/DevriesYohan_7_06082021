<template>
  <div class="home">
      <header>
        <div class="header__list">
          <router-link class="signinLink" to="/all-articles">Retour</router-link>            
        </div>
    </header>
    <main class="body__homepage">

      <div v-if="this.$route.path == '/new/article'">
          <newArticle/>
      </div>
        <div v-if="this.$route.name == 'ModifyArticle'">
          <modifyArticle/>
      </div>
      <div v-if="this.$route.name == 'GetArticle'">
        <getArticle />
      </div>
</main>
  </div>
</template>

<script>
import getArticle from '@/components/getArticle.vue'
import newArticle from '@/components/newArticle.vue'
import modifyArticle from '@/components/modifyArticle.vue'

export default {
  name: 'Article',
  components: {
    getArticle,
    newArticle,
    modifyArticle,
  },
  mounted() {
  },
}
</script>

