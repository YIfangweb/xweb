import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './style.css'

import router from './router';
import App from './App.vue'
import axios from 'axios';


const pinia = createPinia()

const app =  createApp(App);

// 配置axios请求地址并暴露为全局变量
axios.defaults.baseURL = 'http://localhost:1314'
app.config.globalProperties.$http=axios

app.use(router)
app.use(pinia)
app.mount('#app')