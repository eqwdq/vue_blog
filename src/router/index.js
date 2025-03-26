// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import BlogPosts from '../views/BlogPosts.vue'
import BlogPostDetail from '../views/BlogPostDetail.vue'
import AboutView from '../views/AboutView.vue'
import ContactView from '../views/ContactView.vue'
import PricingView from '../views/PricingView.vue'
import ProfileView from '../views/ProfileView.vue'

const routes = [
  {
    path: '/',
    name: 'BlogPosts',
    component: BlogPosts,
    props: true
  },
  {
    path: '/post/:id',
    name: 'BlogPostDetail',
    component: BlogPostDetail,
    props: true
  },
  {
    path: '/about',
    name: 'About',
    component: AboutView
  },
  {
    path: '/contact',
    name: 'Contact',
    component: ContactView
  },
  {
    path: '/pricing',
    name: 'Pricing',
    component: PricingView
  },
  {
    path: '/profile',
    name: 'Profile',
    component: ProfileView
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router