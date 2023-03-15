import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  scrollBehavior() {
    return { x: 0, y: 0 }
  },
  routes: [
    {
      path: '/',
      name: 'main',
      component: () => import('@/views/Main.vue'),
      meta: {
        layout: 'full',
      },
    },
    {
      path: '/home',
      name: 'home',
      component: () => import('@/views/Home.vue'),
      meta: {
        pageTitle: 'Home',
        breadcrumb: [
          {
            text: 'Home',
            active: true,
          },
        ],
      },
    },
    {
      path: '/second-page',
      name: 'second-page',
      component: () => import('@/views/SecondPage.vue'),
      meta: {
        pageTitle: 'Second Page',
        breadcrumb: [
          {
            text: 'Second Page',
            active: true,
          },
        ],
      },
    },
    {
      path: '/meet',
      name: 'meet',
      component: () => import('@/views/Meet.vue'),
      meta: {
        pageTitle: 'tele',
        breadcrumb: [
          {
            text: 'tele',
            active: true,
          },
        ],
      },
    },
    {
      path: '/meet/:id',
      name: 'meetid',
      component: () => import('@/views/Tele.vue'),
      meta: {
        pageTitle: 'tele',
        breadcrumb: [
          {
            text: 'tele',
            active: true,
          },
        ],
      },
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/Login.vue'),
      meta: {
        layout: 'full',
      },
    },
    {
      path: '/tele/full/:id',
      name: 'zoom-full',
      component: () => import('@/views/zoom/Full.vue'),
      meta: {
        layout: 'full',
      },
    },
    {
      path: '/tele/component/:id',
      name: 'zoom-component',
      component: () => import('@/views/zoom/Component.vue'),
      meta: {
        layout: 'full',
      },
    },
    {
      path: '/tele/signout',
      name: 'tele-signout',
      component: () => import('@/views/zoom/Signout.vue'),
      meta: {
        layout: 'full',
      },
    },
    {
      path: '/error-404',
      name: 'error-404',
      component: () => import('@/views/error/Error404.vue'),
      meta: {
        layout: 'full',
      },
    },
    {
      path: '*',
      redirect: 'error-404',
    },
  ],
})

// ? For splash screen
// Remove afterEach hook if you are not using splash screen
router.afterEach(() => {
  // Remove initial loading
  const appLoading = document.getElementById('loading-bg')
  if (appLoading) {
    appLoading.style.display = 'none'
  }
})

export default router
