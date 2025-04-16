import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'BlogPosts',
    component: () => import('../views/BlogPosts.vue'),
    props: true
  },
  {
    path: '/post/:id',
    name: 'BlogPostDetail',
    component: () => import('../views/BlogPostDetail.vue'),
    props: true
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/AboutView.vue')
  },
  {
    path: '/contact',
    name: 'Contact',
    component: () => import('../views/ContactView.vue')
  },
  {
    path: '/pricing',
    name: 'Pricing',
    component: () => import('../views/PricingView.vue')
  },
  {
    path: '/profile',
    name: 'Profile',
    component: () => import('../views/ProfileView.vue')
  }
]


const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router