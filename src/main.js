import { createApp } from 'vue';
import App from './App.vue';

import { createRouter, createWebHistory } from 'vue-router';

// Import Bootstrap, Popper.js and fortawesome
import 'bootstrap/dist/css/bootstrap.min.css'; // Bootstrap CSS
import 'bootstrap'; // Bootstrap JS
import '@popperjs/core'; // Popper.js
import '@fortawesome/fontawesome-free/css/all.css';

// Import your components
import Login from './components/Login.vue';
import Home from './components/Home.vue';
import Register from './components/Register.vue';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', component: Home },
        { path: '/login', component: Login },
        { path: '/register', component: Register },
    ]
});

const app = createApp(App);

app.mixin({
    methods: {
        getUser() {
            return JSON.parse(localStorage.getItem('decodedUser'));
        }
    }
});

app.use(router);
app.mount('#app');
