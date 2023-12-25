import { createApp } from 'vue'
import App from './App.vue'
import router from './router';
import axios from './axios'

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

const app = createApp(App).use(router)

app.config.globalProperties.axios=axios

app.mount('#app')
