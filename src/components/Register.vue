<template>
    <div class="right-container d-flex justify-content-end align-items-center">
        <form @submit.prevent="register" class="right-form">
            <!-- User name field -->
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
            
            <!-- ID card field -->
            <div class="row mb-3">
                <div class="col-md-4">
                    <label for="idCard" class="form-label">ID card:</label>
                </div>
                <div class="col-md-8">
                    <input
                    type="text"
                    id="idCard"
                    v-model="idCard"
                    required
                    class="form-control"
                    />
                </div>
            </div>
            
            <!-- Toggle Switch for User Type (Employee or Regular User) -->
            <div class="row mb-3">
                <!-- <div class="col-md-4">
                    <label class="form-label">User Type:</label>
                </div> -->
                <div class="col-md-8 d-flex align-items-center">
                    <label class="switch">
                        <input type="checkbox" v-model="isEmployee" />
                        <span class="slider round"></span>
                    </label>
                    <span class="ms-2">{{ isEmployee ? 'Employee' : 'Driver' }}</span>
                </div>
            </div>
            
            <!-- Licence field -->
            <div v-if="!isEmployee" class="row mb-3">
                <div class="col-md-4">
                    <label for="licence" class="form-label">Licence:</label>
                </div>
                <div class="col-md-8">
                    <input
                    type="text"
                    id="licence"
                    v-model="licence"
                    required
                    class="form-control"
                    />
                </div>
            </div>
            
            <!-- Password Field with Toggle Eye -->
            <div class="row mb-3">
                <div class="col-md-4">
                    <label for="password" class="form-label">Password:</label>
                </div>
                <div class="col-md-8">
                    <div class="input-group">
                        <input
                        :type="showPassword ? 'text' : 'password'"
                        id="password"
                        v-model="password"
                        required
                        class="form-control"
                        @input="checkPasswordStrength"
                        />
                        <span class="input-group-text" @click="toggleShowPassword">
                            <i :class="showPassword ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
                        </span>
                    </div>
                    
                    <!-- Password Strength Bar -->
                    <div class="password-strength mt-2">
                        <div class="progress">
                            <div
                            class="progress-bar"
                            :class="passwordStrengthClass"
                            role="progressbar"
                            :style="{ width: passwordStrength + '%' }"
                            :aria-valuenow="passwordStrength"
                            aria-valuemin="0"
                            aria-valuemax="100"
                            >
                        </div>
                    </div>
                    <small class="text-muted">{{ passwordStrengthLabel }}</small>
                </div>
            </div>
        </div>
        
        <!-- Repeat password Field with Toggle Eye -->
        <div class="row mb-3">
            <div class="col-md-4">
                <label for="password2" class="form-label">Repeat password:</label>
            </div>
            <div class="col-md-8">
                <div class="input-group">
                    <input
                    :type="showPassword2 ? 'text' : 'password'"
                    id="password2"
                    v-model="password2"
                    required
                    class="form-control"
                    />
                    <span class="input-group-text" @click="toggleShowPassword2">
                        <i :class="showPassword2 ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
                    </span>
                </div>
            </div>
        </div>
        
        <button type="submit" class="btn btn-primary w-100">Register</button>
    </form>
</div>

<footer class="footer fixed-bottom">
    <div class="container text-center">
        <div v-if="message" :class="alertClass">
            {{ message }}
        </div>
    </div>
</footer>
</template>

<script>
import zxcvbn from 'zxcvbn';

export default {
    data() {
        return {
            username: '',
            idCard: '',
            password: '',
            password2: '',
            message: '',
            alertClass: '',
            showPassword: false, // Toggle password visibility
            showPassword2: false, // Toggle repeat password visibility
            passwordStrength: 0, // Strength value (percentage)
            passwordStrengthLabel: '', // Label for the strength
            passwordStrengthClass: '', // Class for the progress bar
            isEmployee: true,
            licence:'',
            // requestBody: null
        };
    },
    methods: {
        setMessage(msg, type) {
            this.message = msg;
            this.alertClass = type === 'success' ? 'alert alert-success' : 'alert alert-danger';
            setTimeout(() => (this.message = ''), 5000);
        },
        resetForm(){
            this.username = '';
            this.idCard = '';
            this.password = '';
            this.password2 = '';
            this.isEmployee = true;
            this.licence = '';
        },
        async register() {
            if(this.password!=this.password2){
                this.setMessage('Passwords do not match', 'error');
            } else {
                try {
                    const response = await fetch('http://localhost:8080/api/auth/register', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            username: this.username,
                            password: this.password,
                            idCard: this.idCard,
                            role: this.isEmployee ? "employee" : "driver",
                            licence: this.licence
                        }),
                    });
                    
                    if (!response.ok) {
                        const error = await response.json();
                        this.setMessage(error.error || 'Failed to register', 'error');
                    } else {
                        this.resetForm();
                        this.setMessage('Register successful. Redirecting to login.', 'success');
                        // Delay for 2 seconds before redirecting
                        setTimeout(() => {
                            this.$router.push('/login');
                        }, 2000); // 2000 ms = 2 seconds
                    }
                } catch (error) {
                    this.setMessage(error.message || 'Failed to register', 'error');
                }
            }  
        },
        toggleShowPassword() {
            this.showPassword = !this.showPassword;
        },
        toggleShowPassword2() {
            this.showPassword2 = !this.showPassword2;
        },
        checkPasswordStrength() {
            const strength = zxcvbn(this.password);
            this.passwordStrength = (strength.score / 4) * 100;
            
            switch (strength.score) {
                case 0:
                this.passwordStrengthLabel = 'Very Weak';
                this.passwordStrengthClass = 'bg-danger';
                break;
                case 1:
                this.passwordStrengthLabel = 'Weak';
                this.passwordStrengthClass = 'bg-warning';
                break;
                case 2:
                this.passwordStrengthLabel = 'Okay';
                this.passwordStrengthClass = 'bg-info';
                break;
                case 3:
                this.passwordStrengthLabel = 'Good';
                this.passwordStrengthClass = 'bg-primary';
                break;
                case 4:
                this.passwordStrengthLabel = 'Strong';
                this.passwordStrengthClass = 'bg-success';
                break;
                default:
                this.passwordStrengthLabel = '';
                this.passwordStrengthClass = '';
            }
        }
    }
};
</script>

<style scoped>
.input-group-text {
    cursor: pointer;
}

.password-strength .progress {
    height: 6px;
}

.password-strength .progress-bar {
    transition: width 0.5s ease;
}

/* Switch styling */
.switch {
    position: relative;
    display: inline-block;
    width: 34px;
    height: 20px;
}

.switch input {
    opacity: 0;
    width: 0;
    height: 0;
}

.slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #ccc;
    transition: .4s;
    border-radius: 34px;
}

.slider:before {
    position: absolute;
    content: "";
    height: 12px;
    width: 12px;
    left: 4px;
    bottom: 4px;
    background-color: white;
    transition: .4s;
    border-radius: 50%;
}

input:checked + .slider {
    background-color: #2196F3;
}

input:checked + .slider:before {
    transform: translateX(14px);
}
</style>
