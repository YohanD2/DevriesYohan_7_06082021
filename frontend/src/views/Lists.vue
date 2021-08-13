<template>

  <div class="home">
    <header>
        <div class="header__list">
          <router-link class="signinLink" to="/home">Retour</router-link>            
        </div>
    </header>
    <main class="body__homepage">
      <div v-if="this.$route.path == '/all-articles'">
          <ListArticles/>
      </div>
      <div v-if="this.$route.path == '/all-conversations'">
          <ListConversations/>
      </div>
      </main>
  </div>
</template>

<script>

import ListArticles from '@/components/ListArticles.vue'
import ListConversations from '@/components/ListConversations.vue'

export default {
  name: 'Lists',
  components: {
    ListArticles,
    ListConversations,
  },
  mounted() {
  },
}
</script>

<style scoped>


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
