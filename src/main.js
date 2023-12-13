import { createApp } from 'vue'
import './style.css'

import router from './router';
import MakeitCaptcha from 'makeit-captcha'
import 'makeit-captcha/dist/captcha.min.css'
import App from './App.vue'
import axios from 'vue-axios';

createApp.prototype.axios = axios;
//允许跨域
axios.defaults.withCredentials =true;
//响应头
axios.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded;charset=UTF-8";

axios.defaults.baseURL ='/api';

var app =  createApp(App);

app.use(router).use(MakeitCaptcha)
app.mount('#app')