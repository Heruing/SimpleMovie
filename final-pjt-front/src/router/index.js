import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home.vue'
//accounts
import Signup from '@/views/accounts/Signup'
import Login from '@/views/accounts/Login'
import Profile from '@/views/accounts/Profile'

//movies
import Detail from '@/views/movies/Detail.vue'
import Honor from '@/views/movies/Honor.vue'
import Recent from '@/views/movies/Recent.vue'
import Upcoming from '@/views/movies/Upcoming.vue'
import Recommendation from '@/views/movies/Recommendation.vue'
import Random from '@/views/movies/Random.vue'

//forum
import Forum from '@/views/forum/Forum.vue'
import Review from '@/views/forum/Review.vue'

//block
import Block from '@/views/Block.vue'
import Alert from '@/views/Alert.vue'


//test
import Search from '@/views/Search.vue'

Vue.use(VueRouter)


const routes = [
  {
    path: '/search',
    name: 'Search',
    component: Search
  },
  {
    path: '/alert',
    name: 'Alert',
    component: Alert
  },
  {
    path: '/block',
    name: 'Block',
    component: Block
  },
  {
    path: '/forum/review/:reviewId',
    name: 'Review',
    component: Review
  },
  {
    path: '/upcoming/',
    name: 'upcoming',
    component: Upcoming
  },
  {
    path: '/recent/',
    name: 'recent',
    component: Recent
  },
  {
    path: '/honor/',
    name: 'Honor',
    component: Honor
  },
  {
    path: '/forum/:movieId',
    name: 'Forum',
    component: Forum
  },
  {
    path: '/detail/:movieId',
    name: 'Detail',
    component: Detail
  },
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/random',
    name: 'Random',
    component: Random
  },
  {
    path: '/Recommendation',
    name: 'Recommendation',
    component: Recommendation
  },
  {
    path: '/accounts/signup',
    name: 'Signup',
    component: Signup,
  },
  {
    path: '/accounts/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/accounts/profile',
    name: 'Profile',
    component: Profile,
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
