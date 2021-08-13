<template>
  <div class="home">
      <header>
        <div class="header__list">
          <router-link class="signinLink" to="/all-conversations">Retour</router-link>            
        </div>
    </header>
    <main class="body__homepage">

      <div v-if="this.$route.name == 'GetConversation'">
          <getConversation />
      </div>

      <div v-if="this.$route.path == '/new/conversation'">
          <newConversation />
        
      </div>
</main>
  </div>
</template>

<script>
import getConversation from '@/components/getConversation.vue'
import newConversation from '@/components/newConversation.vue'

export default {
  name: 'Conversation',
  components: {
    getConversation,
    newConversation,
  },
  mounted() {
  },
}
</script>