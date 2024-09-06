import { createApp } from 'vue';
import App from './App.vue';

import { createRouter, createWebHistory } from 'vue-router';

// Import Bootstrap and Popper.js
import 'bootstrap/dist/css/bootstrap.min.css'; // Bootstrap CSS
import 'bootstrap'; // Bootstrap JS
import '@popperjs/core'; // Popper.js

// Import your components
import Login from './components/Login.vue';
import Home from './components/Home.vue';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', component: Home },
        { path: '/login', component: Login },
    ]
});

const app = createApp(App);
app.use(router);
app.mount('#app');
