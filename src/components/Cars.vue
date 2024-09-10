<template>
    <table style="margin-left: 20px;" class="w-auto table table-hover ">
        <thead>
            <tr>
                <th>Plate</th>
                <th>Date</th>
                <th>Owner</th>
                <th></th>
                <th></th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="car in data" :key="car._id">
                <td>{{ car.plate }}</td>
                <td>{{ car.date }}</td> 
                <td v-if="car.seeOwner">
                    <b>Name:</b> {{ car.ownerName }}<br>
                    <b>Id Card:</b> {{ car.ownerIdCard }}<br>
                    <b>Licence:</b> {{ car.ownerLicence }}
                </td>
                <td v-else>
                    <img src="/see.png" @click="toggleSee(car)"/>
                </td>
                <td>
                    <img v-if="car.seeOwner" src="/hide.png" @click="toggleSee(car)"/>
                </td>
                <td>
                    <img src="/edit.png" @click="toggleEdit(car)">
                    <img src="/delete.png" @click="showDeleteModal(car)">
                </td>
            </tr>
        </tbody>
    </table>
    <img style="margin-left: 20px;" src="/add.png" @click="toggleAdd()">
    <div>
        <div class="container">
            <div class="row">
                <div class="col-md-3">
                    <!-- Add Form -->
                    <form v-if="add" @submit.prevent="showConfirmModal">
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
                        
                        <div class="row mb-3">
                            <div class="col-md-4">
                                <label for="driverSelect" class="form-label">Driver:</label>
                            </div>
                            <div class="col-md-8">
                                <select class="form-select" id="driverSelect" v-model="newCar.ownerLicence">
                                    <option value="" disabled>Select driver:</option>
                                    <option v-for="driver in drivers" :key="driver._id" :value="driver.licence">
                                        {{ driver.name }}
                                    </option>
                                </select>
                            </div>
                        </div>
                        
                        <div class="row">
                            <div class="col-md-12 d-flex justify-content-end">
                                <button type="button" class="btn btn-danger me-2" @click="cancelAdd">Cancel</button>
                                <button type="submit" class="btn btn-success">Confirm</button>
                            </div>
                        </div>
                    </form>
                    
                    <!-- Edit form -->
                    <form v-if="edit" @submit.prevent="showConfirmEditModal">
                        <h5>Edit Car:</h5>
                        
                        <div class="row mb-3">
                            <div class="col-md-4">
                                <label for="plateField" class="form-label">Plate:</label>
                            </div>
                            <div class="col-md-8">
                                <input type="text" class="form-control" id="plateField" v-model="activeCar.plate">
                            </div>
                        </div>
                        
                        <div class="row mb-3">
                            <div class="col-md-4">
                                <label for="dateField" class="form-label">Date:</label>
                            </div>
                            <div class="col-md-8">
                                <input type="date" class="form-control" id="dateField" v-model="formattedDate">
                            </div>
                        </div>
                        
                        <div class="row mb-3">
                            <div class="col-md-4">
                                <label for="driverSelect" class="form-label">Driver:</label>
                            </div>
                            <div class="col-md-8">
                                <select class="form-select" id="driverSelect" v-model="activeCar.ownerLicence">
                                    <option value="" disabled>Select</option>
                                    <option v-for="driver in drivers"  :key="driver._id" :value="driver.licence">
                                        {{ driver.name }}
                                    </option>
                                </select>
                            </div>
                        </div>
                        
                        <div class="row">
                            <div class="col-md-12 d-flex justify-content-end">
                                <button type="button" class="btn btn-danger me-2" @click="cancelEdit">Cancel</button>
                                <button type="submit" class="btn btn-success">Confirm</button>
                            </div>
                        </div>
                    </form>
                    
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
                                    <strong>Date:</strong> {{ newCar.date }}<br> 
                                    <strong>Driver:</strong>
                                    <ul>
                                        <li><strong>Name:</strong> {{ selectedDriver.name }}</li>
                                        <li><strong>ID card:</strong> {{ selectedDriver.idCard }}</li>
                                        <li><strong>Licence:</strong> {{ newCar.ownerLicence }}</li>
                                    </ul>
                                    Are you sure?
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                                    <button type="button" class="btn btn-primary" @click="confirmSubmit">Confirm</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Edit Confirmation Modal -->
                    <div class="modal fade" id="confirmEditModal" tabindex="-1" aria-labelledby="confirmEditModalLabel" aria-hidden="true">
                        <div class="modal-dialog">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title" id="confirmEditModalLabel">Confirm Edit</h5>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div class="modal-body" v-if="oldCar.plate!=activeCar.plate || oldCar.date!=activeCar.date || oldCar.ownerLicence!=activeCar.ownerLicence">
                                    You are about to edit the car with the folowing data:<br>
                                    <strong>Plate:</strong> {{ oldCar.plate }}<span v-if="oldCar.plate!=activeCar.plate">&rarr; {{ activeCar.plate }}</span><br>
                                    <strong>Date:</strong> {{ oldCar.date }}<span v-if="oldCar.date!=activeCar.date">&rarr; {{ activeCar.date }}</span><br> 
                                    <strong>Driver:</strong>
                                    <table>
                                        <tr>
                                            <td>
                                                <ul>
                                                    <li><strong>Name:</strong> {{ oldSelectedDriver.name }}</li>
                                                    <li><strong>ID card:</strong> {{ oldSelectedDriver.idCard }}</li>
                                                    <li><strong>Licence:</strong> {{ oldCar.ownerLicence }}</li>
                                                </ul>
                                            </td>
                                            <span v-if="oldCar.ownerLicence!=activeCar.ownerLicence">
                                                <td>
                                                    &rarr;
                                                </td>
                                                <td>
                                                    <ul>
                                                        <li><strong>Name:</strong> {{ selectedDriver.name }}</li>
                                                        <li><strong>ID card:</strong> {{ selectedDriver.idCard }}</li>
                                                        <li><strong>Licence:</strong> {{ activeCar.ownerLicence }}</li>
                                                    </ul>
                                                </td>
                                            </span>
                                        </tr>
                                    </table>
                                    
                                    
                                </div>
                                <div v-else class="modal-body">
                                    No changes were made.
                                </div>
                                <div class="modal-footer" v-if="oldCar.plate!=activeCar.plate || oldCar.date!=activeCar.date || oldCar.ownerLicence!=activeCar.ownerLicence">
                                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                                    <button type="button" class="btn btn-primary" @click="confirmEdit">Confirm</button>
                                </div>
                                <div class="modal-footer" v-else>
                                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Exit</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Modal for deletion confirmation -->
                    <div class="modal fade" id="deleteModal" tabindex="-1" role="dialog" aria-labelledby="deleteModalLabel" aria-hidden="true">
                        <div class="modal-dialog" role="document">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title" id="deleteModalLabel">Confirm Deletion</h5>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div class="modal-body">
                                    You are about to delete the car:<br>
                                    You are about to create a new car with the following data:<br>
                                    <strong>Plate:</strong> {{ activeCar.plate }}<br>
                                    <strong>Date:</strong> {{ activeCar.date }}<br> 
                                    <strong>Driver:</strong>
                                    <ul>
                                        <li><strong>Name:</strong> {{ activeCar.ownerName }}</li>
                                        <li><strong>ID card:</strong> {{ activeCar.ownerIdCard }}</li>
                                        <li><strong>Licence:</strong> {{ activeCar.ownerLicence }}</li>
                                    </ul>
                                    <p>Are you sure? Please enter the car plate to confirm:</p>
                                    <input type="text" v-model="confirmationPlate" class="form-control" placeholder="Enter plate">
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary" @click="hideDeleteModal">Cancel</button>
                                    <button type="button" class="btn btn-danger" @click="confirmDelete">Delete</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
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
import { Modal } from 'bootstrap'; 

export default {
    data() {
        return {
            data: [],
            drivers: [],
            add: false,
            edit: false,
            newCar: {
                _id: '',
                plate: '',
                date: '',
                ownerName:'',
                ownerIdCard:'',
                ownerLicence: ''
            },
            oldCar: {
                _id: '',
                plate: '',
                date: '',
                ownerName:'',
                ownerIdCard:'',
                ownerLicence: ''
            },
            activeCar: {
                _id: '',
                plate: '',
                date: '',
                ownerName:'',
                ownerIdCard:'',
                ownerLicence: ''
            },
            selectedDriver: {
                name: '',
                idCard: ''
            },
            oldSelectedDriver: {
                name: '',
                idCard: ''
            },
            message: '',
            confirmationPlate: ''
        };
    },
    methods: {
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
        async fetchData() {
            const token = localStorage.getItem('userToken');
            try {
                const response = await fetch("http://localhost:8080/api/cars",{
                    method: 'GET', 
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`, 
                    },
                });
                this.data = await response.json();
                this.data = this.data.map(car => ({ ...car, seeOwner: false }));
            } catch (error) {
                const msg = "Error fetching cars: "+error;
                this.setMessage(msg,'alert alert-danger');
            }
        },
        toggleSee(car){
            car.seeOwner = !car.seeOwner;
        },
        toggleAdd() {
            this.newCar = this.resetCar();
            this.add = !this.add;
            this.edit = false;
        },
        async getDrivers() {
            const token = localStorage.getItem('userToken');
            try {
                const response = await fetch("http://localhost:8080/api/drivers",{
                    method: 'GET', 
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`, 
                    },
                });
                if (response.ok) {
                    this.drivers = await response.json();
                } else {
                    const error = await response.json();
                    this.setMessage(error.error || "Failed to fetch drivers", 'error');
                }
            } catch (error) {
                this.setMessage("Error fetching drivers: " + error.message, 'error');
            }
        },
        formatDate(date) {
            if (!date) return '';
            const [year, month, day] = date.split('-');
            return `${day}/${month}/${year}`;
        },
        showConfirmModal() {
            this.newCar.date = this.formatDate(this.newCar.date);
            this.updateSelectedDriver(this.newCar.ownerLicence);
            
            this.addModalInstance.show();
        },
        updateSelectedDriver(dl) {
            const driver = this.drivers.find(d => d.licence === dl);
            if (driver) {
                this.selectedDriver.name = driver.name;
                this.selectedDriver.idCard = driver.idCard;
            } else {
                this.selectedDriver.name = '';
                this.selectedDriver.idCard = '';
            }
        },
        cancelAdd() {
            this.newCar = this.resetCar();
        },
        setMessage(msg, type) {
            this.message = msg;
            this.alertClass = type === 'success' ? 'alert alert-success' : 'alert alert-danger';
            setTimeout(() => this.message = '', 5000);
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
        toggleEdit(car) {
            this.edit =!this.edit;
            this.add = false;
            this.activeCar = { ...car };
            this.oldSelectedDriver.name = car.ownerName;
            this.oldSelectedDriver.idCard = car.ownerIdCard;
            this.oldCar = { ...car };
        },
        cancelEdit() {
            this.edit = false;
        },
        showConfirmEditModal() {
            this.updateSelectedDriver(this.activeCar.ownerLicence);
            this.editModalInstance.show();
        },
        async confirmEdit() {
            this.editModalInstance.hide()
            await this.updateCar();
        },
        async updateCar() {
            const token = localStorage.getItem('userToken');
            try {
                const response = await fetch(`http://localhost:8080/api/cars/${this.activeCar._id}`, {
                    method: 'PUT', 
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`, 
                    },
                    body: JSON.stringify(this.activeCar)
                });
                
                if (response.ok) {
                    await this.fetchData();
                    this.edit = false;
                    this.activeCar = this.resetCar();
                    this.setMessage("Car updated successfully", 'success');
                } else {
                    const error = await response.json();
                    this.setMessage(error.error || "Failed to update car", 'error');
                }
            } catch (error) {
                this.setMessage("Error updating car: " + error.message, 'error');
            }
        },
        showDeleteModal(car) {
            this.activeCar = car;
            this.confirmationPlate = '';
            this.deleteModalInstance.show();
        },
        hideDeleteModal() {
            this.deleteModalInstance.hide();
        },
        async confirmDelete() {
            if (this.confirmationPlate === this.activeCar.plate) {
                await this.deleteCar(this.activeCar._id);
                this.hideDeleteModal(); 
            } else {
                this.hideDeleteModal();
                this.setMessage("Plate does not match. Deletion cancelled.", 'error');
            }
        },
        async deleteCar(id) {
            const token = localStorage.getItem('userToken');
            try {
                const response = await fetch(`http://localhost:8080/api/cars/${id}`, {
                    method: 'DELETE', 
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`, 
                    },
                });
                if (response.ok) {
                    await this.fetchData();
                    this.setMessage("Car deleted successfully", 'success');
                } else {
                    const error = await response.json();
                    this.setMessage(error.error || "Failed to delete car", 'error');
                }
            } catch (error) {
                this.setMessage("Error deleting car: " + error.message, 'error');
            }
        }
    },
    computed: {
        formattedDate: {
            get() {
                if (!this.activeCar.date) return '';
                
                const [day, month, year] = this.activeCar.date.split('/');
                return `${year}-${month}-${day}`;
            },
            set(newValue) {
                const [year, month, day] = newValue.split('-');
                this.activeCar.date = `${day}/${month}/${year}`;
            }
        }
    },
    mounted() {
        if(this.getUser()==null){
            this.$router.push('/login');
        } else {
            this.fetchData();
            this.getDrivers();
            
            const addModalElement = document.getElementById('confirmModal');
            this.addModalInstance = new Modal(addModalElement);
            
            const editModalElement = document.getElementById('confirmEditModal');
            this.editModalInstance = new Modal(editModalElement);
            
            const modalElement = document.getElementById('deleteModal');
            this.deleteModalInstance = new Modal(modalElement);
        }
    },
};
</script>
