import Vue from 'vue'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'

import { Button, Cell, Toast, ActionSheet, Lazyload, PullRefresh, List, Popup } from 'vant' // 常用组件
Vue.use(Button)
Vue.use(Cell)
Vue.use(Toast)
Vue.use(List)
Vue.use(ActionSheet)
Vue.use(PullRefresh)
Vue.use(Popup)
Vue.use(Lazyload, {
    lazyComponent: true
})
// 全局配置Toast
Toast.setDefaultOptions({
    forbidClick: true,
    duration: 1500
})

Vue.use(MintUI)
Vue.prototype.$Toast = Toast
