import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import axios from './util/axios.js'

Vue.prototype.$axios = axios

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')


Vue.filter('dateFormat', function (dateStr, pattern = '') {
  var dt = new Date(Number(dateStr))
  var y = dt.getFullYear()
  var m = (dt.getMonth() + 1).toString().padStart(2, 0)
  var d = dt.getDate().toString().padStart(2, 0)

  if (pattern === 'y-m-d') {
    return `${y}-${m}-${d}`
  } else {
    var h = dt.getHours().toString().padStart(2, 0)
    var mm = dt.getMinutes().toString().padStart(2, 0)
    var s = dt.getSeconds().toString().padStart(2, 0)

    return `${y}-${m}-${d} ${h}:${mm}:${s}`
  }
})
router.beforeEach((to, from, next) => {
  if (to.meta.requireAuth) {
    if (JSON.parse(localStorage.getItem('userinfo'))) {
      next();
    } else {
      next({
        path: '/'
      })
    }
  }
  else {
    next();
  }
});

router.beforeEach((to, from, next) => {
  if (to.meta.requireAdmin) {
    if (JSON.parse(localStorage.getItem('userinfo')) && JSON.parse(localStorage.getItem('userinfo')).userid == "SexyBear") {
      next();
    } else {
      next({
        path: '/'
      })
    }
  }
  else {
    next();
  }
});