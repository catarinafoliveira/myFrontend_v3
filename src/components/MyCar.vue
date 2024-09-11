<template>
    <div class="card">
        <div class="card-header"></div>
        <div class="card-body">
            <blockquote class="blockquote mb-0">
                <div class="text" v-if="empty">
                    No cars
                </div>
                <!-- Show data -->
                <table v-if="!empty" style="margin-left: 20px;" class="w-auto table table-hover text">
                    <thead>
                        <tr>
                            <th>Plate</th>
                            <th>Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="car in data" :key="car._id">
                            <td>{{ car.plate }}</td>
                            <td>{{ car.date }}</td> 
                        </tr>
                    </tbody>
                </table>
                <img style="margin-left: 20px;" src="/add.png" @click="toggleAdd()">
                <!-- Add Form -->
                <form class="text" v-if="add" @submit.prevent="showConfirmModal">
                    <h5>Add Car:</h5>
                    
                    <div class="row mb-3">
                        <div class="col-md-4">
                            <label for="plateField" class="form-label">Plate:</label>
                        </div>
                        <div class="col-md-8">
                            <input type="text" class="form-control" id="plateField" v-model="newCar.plate">
                        </div>
                    </div>
                    
                    <div class="row mb-3">
                        <div class="col-md-4">
                            <label for="dateField" class="form-label">Date:</label>
                        </div>
                        <div class="col-md-8">
                            <input type="date" class="form-control" id="dateField" v-model="newCar.date">
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-12 d-flex justify-content-end">
                            <button type="button" class="btn btn-danger me-2" @click="cancelAdd">Cancel</button>
                            <button type="submit" class="btn btn-success">Confirm</button>
                        </div>
                    </div>
                </form>
            </blockquote>
        </div>
    </div>
    
    <!-- Add Confirmation Modal -->
    <div class="modal fade" id="confirmModal" tabindex="-1" aria-labelledby="confirmModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="confirmModalLabel">Confirm Submission</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    You are about to create a new car with the following data:<br>
                    <strong>Plate:</strong> {{ newCar.plate }}<br>
                    <strong>Date:</strong> {{ newCar.date }}<br><br>
                    Are you sure?
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                    <button type="button" class="btn btn-primary" @click="confirmSubmit">Confirm</button>
                </div>
            </div>
        </div>
    </div>
    
    <!-- Footer -->
    <footer class="footer fixed-bottom">
        <div class="container text-center">
            <div v-if="message" :class="alertClass">
                {{ message }}
            </div>
        </div>
    </footer>
</template>

<script>
import { Modal } from 'bootstrap'; 

export default {
    data() {
        return {
            data: [],
            empty: true,
            message: '',
            alertClass: '',
            add: false,
            newCar: {
                _id: '',
                plate: '',
                date: '',
                ownerName:'',
                ownerIdCard:'',
                ownerLicence: ''
            },
        }
    },
    methods: {
        setMessage(msg, type) {
            this.message = msg;
            this.alertClass = type === 'success' ? 'alert alert-success' : 'alert alert-danger';
            setTimeout(() => this.message = '', 5000); // Clear the message after 5 seconds
        },
        async fetchData() {
            const token = localStorage.getItem('userToken');
            const licence = this.getUserLicence();
            const url = `http://localhost:8080/api/cars/owner/${licence}`;
            try {
                const response = await fetch(url,{
                    method: 'GET', 
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`, 
                    },
                });
                this.data = await response.json();
                if(this.data.length==0){
                    this.empty = true;
                } else {
                    this.empty = false;
                }
                
            } catch (error) {
                const msg = "Error fetching cars: "+error;
                this.setMessage(msg,'alert alert-danger');
            }
        },
        toggleAdd() {
            this.newCar = this.resetCar();
            this.add = !this.add;
        },
        resetCar(){
            return {
                _id: '',
                plate: '',
                date: '',
                ownerName:'',
                ownerIdCard:'',
                ownerLicence: ''
            };
        },
        showConfirmModal() {
            this.newCar.date = this.formatDate(this.newCar.date);
            this.newCar.ownerLicence = this.getUserLicence();            
            this.addModalInstance.show();
        },
        formatDate(date) {
            if (!date) return '';
            const [year, month, day] = date.split('-');
            return `${day}/${month}/${year}`;
        },
        cancelAdd() {
            this.newCar = this.resetCar();
        },
        async confirmSubmit() {
            this.addModalInstance.hide()
            await this.addCar();
        },
        async addCar() {
            const token = localStorage.getItem('userToken');
            try {
                const endpoint = "http://localhost:8080/api/cars";
                
                const response = await fetch(endpoint, {
                    method: 'POST', 
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`, 
                    },
                    body: JSON.stringify(this.newCar)
                });
                
                if (response.ok) {
                    await this.fetchData();
                    this.setMessage("Car added successfully", 'success');
                    this.newCar = this.resetCar();
                    this.add = false; 
                } else {
                    const error = await response.json();
                    this.setMessage(error.error || "Failed to add car", 'error');
                }
            } catch (error) {
                this.setMessage("Error adding person: " + error.message, 'error');
            }
        },
    },
    mounted() {
        if(this.getUser()==null){
            this.$router.push('/login');
        } else {
            this.newCar = this.resetCar();
            this.fetchData();
            const addModalElement = document.getElementById('confirmModal');
            this.addModalInstance = new Modal(addModalElement);
        }
    }
}
</script>

<style scoped>
.text {
    font-size: 1rem;
}
</style>