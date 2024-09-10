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
import Persons from './components/Persons.vue';
import Drivers from './components/Drivers.vue';
import Cars from './components/Cars.vue';
import MyCar from './components/MyCar.vue';
import MyDriver from './components/MyDriver.vue';
import MyPerson from './components/MyPerson.vue';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', component: Home },
        { path: '/login', component: Login },
        { path: '/register', component: Register },
        { path: '/persons', component: Persons },
        { path: '/drivers', component: Drivers },
        { path: '/cars', component: Cars },
        { path: '/person', component: MyPerson },
        { path: '/driver', component: MyDriver },
        { path: '/mycars', component: MyCar },
    ]
});

const app = createApp(App);

app.mixin({
    methods: {
        getUser() {
            return JSON.parse(localStorage.getItem('decodedUser'));
        },
        getUserRole() {
            const user = this.getUser();
            if(user==null){
                return null;
            }
            return user.userRole;
        },
        getUserId() {
            const user = this.getUser();
            if(user==null){
                return null;
            }
            return user.id;
        },
        getUserName() {
            const user = this.getUser();
            if(user==null){
                return null;
            }
            return user.username;
        },
        getUserIdCard() {
            const user = this.getUser();
            if(user==null){
                return null;
            }
            return user.idCard;
        },
        getUserLicence() {
            const user = this.getUser();
            if(user==null){
                return null;
            }
            return user.licence;
        }
    }
});

app.use(router);
app.mount('#app');
