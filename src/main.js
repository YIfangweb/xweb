import { createApp } from 'vue'
import './style.css'

import router from './router';
import MakeitCaptcha from 'makeit-captcha'
import 'makeit-captcha/dist/captcha.min.css'
import App from './App.vue'

var app =  createApp(App);

app.use(router).use(MakeitCaptcha)
app.mount('#app')