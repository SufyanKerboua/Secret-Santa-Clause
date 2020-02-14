import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import MailSender from '../views/MailSender.vue'
import GroupCreator from '../views/GroupCreator.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/settings',
    name: 'Settings',
    component: () => import(/* webpackChunkName: "about" */ '../views/Settings.vue')
  },
  {
    path: '/mailSender',
    name: 'MailSender',
    component: MailSender,
    props: true
  },
  {
    path: '/groupCreator',
    name: 'GroupCreator',
    component: GroupCreator
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
