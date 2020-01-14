import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);

export default new Router({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      redirect: '/home',
      name: 'start',
    },
    {
      path: '/home',
      name: 'home',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      // component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
      component: () => import(/* webpackChunkName: "about" */ './views/HomeSearch.vue')
    },
    {
      path: '/restaurants',
      name: 'restaurants',
      component: () => import(/* webpackChunkName: "about" */ './views/RestaurantList.vue')
    },
    {
      path: '/top',
      name: 'top',
      component: () => import(/* webpackChunkName: "about" */ './views/TopRestaurants.vue')
    },
    {
      path: '/restaurant/:id',
      name: 'reviews',
      component: () => import(/* webpackChunkName: "about" */ './views/ReviewList.vue')
    },
    {
      path: '/review/:placeid',
      name: 'add-review',
      component: () => import(/* webpackChunkName: "about" */ './views/CreateReview'),
      props: true
    },
  ]
})
