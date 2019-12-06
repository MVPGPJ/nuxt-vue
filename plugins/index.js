import Vue from 'vue'
import apis from '@/api/syncData/index.js'

// Vue.use(apis)
Vue.prototype.$apis = apis
