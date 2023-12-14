import { createApp } from 'vue'
import './style.css'

import router from './router';
import App from './App.vue'
import axios from 'axios';

var app =  createApp(App);

axios.defaults.baseURL = 'http://localhost:1314',
app.config.globalProperties.$http=axios

app.use(router)
app.mount('#app')