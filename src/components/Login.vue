<template>
    <div class="right-container d-flex justify-content-end align-items-center">
        <form @submit.prevent="login" class="right-form">
            <div class="row mb-3">
                <div class="col-md-4">
                    <label for="username" class="form-label">Username:</label>
                </div>
                <div class="col-md-8">
                    <input
                    type="text"
                    id="username"
                    v-model="username"
                    required
                    class="form-control"
                    />
                </div>
            </div>
            
            <div class="row mb-3">
                <div class="col-md-4">
                    <label for="password" class="form-label">Password:</label>
                </div>
                <div class="col-md-8">
                    <input
                    type="password"
                    id="password"
                    v-model="password"
                    required
                    class="form-control"
                    />
                </div>
            </div>
            
            <button type="submit" class="btn btn-primary w-100">Login</button>
        </form>
    </div>
    <footer class="footer fixed-bottom">
        <div class="container text-center">
            <div v-if="errorMessage" :class="alertClass">
                {{ errorMessage }}
            </div>
        </div>
    </footer>
</template>

<script>
import { jwtDecode } from 'jwt-decode';

export default {
    data() {
        return {
            username: '',
            password: '',
            errorMessage: '',
            alertClass: '',
        };
    },
    methods: {
        async login() {
            try {
                const response = await fetch('http://localhost:8080/api/auth/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        username: this.username,
                        password: this.password,
                    }),
                });
                
                if (!response.ok) {
                    const error = await response.json();
                    this.setErrorMessage(error.error || 'Failed to login', 'error');
                } else {
                    const data = await response.json();
                    
                    if (data.userToken) {
                        localStorage.setItem('userToken', data.userToken);
                        localStorage.setItem('decodedUser', JSON.stringify(jwtDecode(data.userToken)));
                        this.$router.push('/');
                    } else {
                        this.setErrorMessage('Failed to login', 'error');
                    }
                }
            } catch (error) {
                this.setErrorMessage(error.message || 'Failed to login', 'error');
            }
        },
        setErrorMessage(msg, type) {
            this.errorMessage = msg;
            this.alertClass = type === 'success' ? 'alert alert-success' : 'alert alert-danger';
            setTimeout(() => (this.errorMessage = ''), 5000);
        },
    },
};
</script>