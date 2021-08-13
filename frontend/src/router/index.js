import Vue from 'vue'
import VueRouter from 'vue-router'
import Log from '../views/Log.vue'
import Home from '../views/Home.vue'
import Lists from '../views/Lists.vue'
import Article from '../views/Article.vue'
import Conversation from '../views/Conversation.vue'


Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'Log',
    component: Log,
  },
  {
    path: '/signup',
    name: 'Signup',
    component: Log
  },
  {
    path: '/home',
    name: 'Home',
    component: Home
  },
  {
    path: '/all-articles',
    name: 'ListArticles',
    component: Lists
  },
  {
    path: '/all-conversations',
    name: 'ListConversations',
    component: Lists
  },
  {
    path: '/new/article',
    name: 'NewArticle',
    component: Article
  },
  {
    path: '/modify/article/:id',
    name: 'ModifyArticle',
    component: Article
  },
  {
    path: '/article/:id',
    name: 'GetArticle',
    component: Article
  },
  {
    path: '/new/conversation',
    name: 'NewConversation',
    component: Conversation
  },
  {
    path: '/conversation/:id',
    name: 'GetConversation',
    component: Conversation
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  routes,
  mode:'history'
})

export default router
