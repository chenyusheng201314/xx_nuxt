import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const _4d1553bf = () => import('..\\pages\\secret\\index.vue' /* webpackChunkName: "pages_secret_index" */).then(m => m.default || m)
const _95ceb5f8 = () => import('..\\pages\\user\\index.vue' /* webpackChunkName: "pages_user_index" */).then(m => m.default || m)
const _dfeced8a = () => import('..\\pages\\user\\show.vue' /* webpackChunkName: "pages_user_show" */).then(m => m.default || m)
const _ac57cf28 = () => import('..\\pages\\user\\_id.vue' /* webpackChunkName: "pages_user__id" */).then(m => m.default || m)
const _562720ef = () => import('..\\pages\\index.vue' /* webpackChunkName: "pages_index" */).then(m => m.default || m)



if (process.client) {
  window.history.scrollRestoration = 'manual'
}
const scrollBehavior = function (to, from, savedPosition) {
  // if the returned position is falsy or an empty object,
  // will retain current scroll position.
  let position = false

  // if no children detected
  if (to.matched.length < 2) {
    // scroll to the top of the page
    position = { x: 0, y: 0 }
  } else if (to.matched.some((r) => r.components.default.options.scrollToTop)) {
    // if one of the children has scrollToTop option set to true
    position = { x: 0, y: 0 }
  }

  // savedPosition is only available for popstate navigations (back button)
  if (savedPosition) {
    position = savedPosition
  }

  return new Promise(resolve => {
    // wait for the out transition to complete (if necessary)
    window.$nuxt.$once('triggerScroll', () => {
      // coords will be used if no selector is provided,
      // or if the selector didn't match any element.
      if (to.hash) {
        let hash = to.hash
        // CSS.escape() is not supported with IE and Edge.
        if (typeof window.CSS !== 'undefined' && typeof window.CSS.escape !== 'undefined') {
          hash = '#' + window.CSS.escape(hash.substr(1))
        }
        try {
          if (document.querySelector(hash)) {
            // scroll to anchor by returning the selector
            position = { selector: hash }
          }
        } catch (e) {
          console.warn('Failed to save scroll position. Please add CSS.escape() polyfill (https://github.com/mathiasbynens/CSS.escape).')
        }
      }
      resolve(position)
    })
  })
}


export function createRouter () {
  return new Router({
    mode: 'history',
    base: '/',
    linkActiveClass: 'nuxt-link-active',
    linkExactActiveClass: 'nuxt-link-exact-active',
    scrollBehavior,
    routes: [
		{
			path: "/secret",
			component: _4d1553bf,
			name: "secret"
		},
		{
			path: "/user",
			component: _95ceb5f8,
			name: "user"
		},
		{
			path: "/user/show",
			component: _dfeced8a,
			name: "user-show"
		},
		{
			path: "/user/:id",
			component: _ac57cf28,
			name: "user-id"
		},
		{
			path: "/",
			component: _562720ef,
			name: "index"
		}
    ],

    fallback: false
  })
}
