import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import './styles/base.less'
import 'lib-flexible'

Vue.config.productionTip = false
import './styles/iconfont.css'
import HmHeader from './componemts/HmHeader.vue'
import HmLogo from './componemts/HmLogo.vue'
import HmButton from './componemts/HmButton.vue'
import HmPost from './componemts/HmPost.vue'
Vue.component('hm-header', HmHeader)
Vue.component('hm-logo', HmLogo)
Vue.component('hm-button', HmButton)
Vue.component('hm-post', HmPost)

import {
  Field,
  Toast,
  Cell,
  CellGroup,
  Dialog,
  RadioGroup,
  Radio,
  Uploader,
  List,
} from 'vant'

Vue.use(List)
Vue.use(Uploader)
Vue.use(Radio)
Vue.use(RadioGroup)
Vue.use(Dialog)
Vue.use(Cell)
Vue.use(CellGroup)
Vue.use(Field)
Vue.use(Toast)

import moment from 'moment'
Vue.filter('date', function(val, format = 'YYYY-MM-DD') {
  return moment(val).format(format)
})

import axios from 'axios'
axios.defaults.baseURL = 'http://localhost:3000'
//defaults 默认设置  baseURL基础地址

Vue.prototype.$axios = axios

axios.interceptors.request.use(config => {
  let token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = token
  }
  return config
})

axios.interceptors.response.use(res => {
  const { statusCode, message } = res.data
  if (statusCode === 401 && message === '用户信息验证失败') {
    localStorage.removeItem('token')
    localStorage.removeItem('user_id')
    router.push('/login')
  }
  return res
})

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
