import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia';

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./assets/style.scss";

const app = createApp(App)
app.use(router)
const pinia = createPinia();
app.use(pinia);

app.mount('#app')