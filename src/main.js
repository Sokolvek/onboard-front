import { createApp } from 'vue'
import './style.css'
import {createPinia} from 'pinia'
import App from './App.vue'
import { router } from './router'

import "./assets/styles/global.css"
import ToastPlugin from 'vue-toast-notification';
// Import one of the available themes
//import 'vue-toast-notification/dist/theme-default.css';
import 'vue-toast-notification/dist/theme-bootstrap.css';
const pinia = createPinia()
const app = createApp(App)

app.use(router)
app.use(ToastPlugin);
app.use(pinia)

app.mount('#app')
