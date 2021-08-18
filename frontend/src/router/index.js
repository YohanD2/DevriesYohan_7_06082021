import Vue from 'vue'
import VueRouter from 'vue-router'
import Log from '../views/Log.vue'
import Home from '../views/Home.vue'
import Lists from '../views/Lists.vue'
import Article from '../views/Article.vue'
import Post from '../views/Post.vue'
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
    path: '/all-posts',
    name: 'ListPosts',
    component: Lists
  },
  {
    path: '/new/post',
    name: 'NewPost',
    component: Post
  },
  {
    path: '/modify/post/:id',
    name: 'ModifyPost',
    component: Post
  },
  {
    path: '/post/:id',
    name: 'GetPost',
    component: Post
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
  }
]

const router = new VueRouter({
  routes,
  mode:'history'
})

export default router
