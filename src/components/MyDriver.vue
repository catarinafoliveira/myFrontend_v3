<template>
    <div v-if="this.getUserRole()=='driver'" class="my-driver">
        <!-- Left menu for selecting API actions -->
        <ul class="nav flex-column">
            <li class="nav-item">
                <a class="nav-link" href="#" @click="getDriver('getById')">Get by ID</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="#" @click="getDriver('getByName')">Get by Name</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="#" @click="getDriver('getByIdCard')">Get by ID Card</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="#" @click="getDriver('getByLicence')">Get by Licence</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="#" @click="updateDriver()">Update Driver</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="#" @click="deleteDriver()">Delete Driver</a>
            </li>
        </ul>
        
        <!-- Dynamic results -->
        <div v-if="selectedAction">
            <div class="card">
                <div class="card-header">
                    {{ title }}
                </div>
                <div class="card-body">
                    <blockquote class="blockquote mb-0">
                        <!-- View data -->
                        <div class="text" v-if="selectedAction === 'getById' || selectedAction === 'getByName' || selectedAction === 'getByIdCard' || selectedAction === 'getByLicence'" >
                            <table style="margin-left: 20px;" class="w-auto table table-hover">
                                <thead class="thead-dark">
                                    <tr>
                                        <th scope="col"></th>
                                        <th scope="col"></th>
                                        <th scope="col">Name</th>
                                        <th scope="col">Id Card</th>
                                        <th scope="col">Licence</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>
                                            <img v-if="driver.status === 'inactive'" src="/inactive.png"/>
                                        </td>
                                        <td>
                                            <img v-if="driver.__t === 'Driver'" src="/steering.png"/>
                                        </td>
                                        <td>{{ driver.name }}</td>
                                        <td>{{ driver.idCard }}</td>
                                        <td>{{ driver.licence }}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <!-- Edit data -->
                        <div class="text" v-else-if="selectedAction === 'updateDriver'">
                            <form @submit.prevent="showConfirmEditModal">
                                <div class="row mb-3">
                                    <div class="col-md-4">
                                        <label for="nameField" class="form-label">Name:</label>
                                    </div>
                                    <div class="col-md-8">
                                        <input type="text" class="form-control" id="nameField" v-model="editDriver.name">
                                    </div>
                                </div>
                                <div class="row mb-3">
                                    <div class="col-md-4">
                                        <label for="idField" class="form-label">Id Card:</label>
                                    </div>
                                    <div class="col-md-8">
                                        <input type="text" class="form-control" id="idField" v-model="editDriver.idCard">
                                    </div>
                                </div>
                                <div class="row mb-3">
                                    <div class="col-md-4">
                                        <label for="idField" class="form-label">Licence:</label>
                                    </div>
                                    <div class="col-md-8">
                                        <input type="text" class="form-control" id="idField" v-model="editDriver.licence">
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-md-12 d-flex justify-content-end">
                                        <button type="button" class="btn btn-danger me-2" @click="cancelEdit">Cancel</button>
                                        <button type="submit" class="btn btn-success">Confirm</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <!-- Delete data -->
                        <div class="text" v-else>
                            <p>Deactivate your acount will log you out of the system and you will not be able to login again.</p> 
                            <p>Are you sure?</p>
                            <button class="btn btn-danger" @click="showDeleteModal">Deactivate & logout</button>
                        </div>
                    </blockquote>
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
    
    <!-- Edit Confirmation Modal -->
    <div class="modal fade" id="confirmEditModal" tabindex="-1" aria-labelledby="confirmEditModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="confirmEditModalLabel">Confirm Edit</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div v-if="driver.name!=editDriver.name || driver.idCard!=editDriver.idCard || driver.licence!=editDriver.licence" class="modal-body">
                    You are about to edit the driver with the folowing data:<br>
                    <strong>Name:</strong> {{driver.name}} <span v-if="driver.name!=editDriver.name">&rarr; {{ editDriver.name }}</span><br>
                    <strong>ID Card:</strong> {{driver.idCard}} <span v-if="driver.idCard!=editDriver.idCard">&rarr; {{ editDriver.idCard }}</span><br>
                    <strong>ID Card:</strong> {{driver.licence}} <span v-if="driver.licence!=editDriver.licence">&rarr; {{ editDriver.licence }}</span><br><br>
                    Are you sure?
                </div>
                <div v-else class="modal-body">
                    No changes were made.
                </div>
                <div v-if="driver.name!=editDriver.name || driver.idCard!=editDriver.idCard || driver.licence!=editDriver.licence" class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                    <button type="button" class="btn btn-primary" @click="confirmEdit">Confirm</button>
                </div>
                <div v-else class="modal-footer">
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
                    <p>You are about to deactivate your account and logout.</p>
                    <p>Are you sure? Please enter your ID card to confirm:</p>
                    <input type="text" v-model="confirmationIdCard" class="form-control" placeholder="Enter ID Card">
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                    <button type="button" class="btn btn-danger" @click="confirmDelete">Delete</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { Modal } from 'bootstrap'; 

export default {
    data() {
        return {
            selectedAction: null,
            driver: {
                idCard:'',
                licence: '',
                name:'',
                status: '',
                __t:'',
                _id:''
            },
            editDriver: {
                idCard:'',
                licence: '',
                name:'',
                status: '',
                __t:'',
                _id:''
            },
            message: '',
            alertClass: '',
            title:'',
            confirmationIdCard: '',
        };
    },
    methods: {
        setMessage(msg, type) {
            this.message = msg;
            this.alertClass = type === 'success' ? 'alert alert-success' : 'alert alert-danger';
            setTimeout(() => this.message = '', 5000); // Clear the message after 5 seconds
        },
        async getDriver(actionSelected){
            this.selectedAction = actionSelected;
            const token = localStorage.getItem('userToken');
            var path;
            var param;
            
            switch(actionSelected){
                case 'getById': {
                    path = 'id'; 
                    param = this.getUserId();
                    break;
                }
                case 'getByName': {
                    path = 'name';  
                    param = this.getUserName();
                    break;
                };
                case 'getByIdCard': {
                    path = 'idcard';  
                    param = this.getUserIdCard();
                    break;
                };
                case 'getByLicence': {
                    path = 'dl'; 
                    param = this.getUserLicence();
                    break;
                }
            };
            this.title = 'Get data by ' + path + ': '+param;
            const url = `http://localhost:8080/api/drivers/${path}/${param}`;
            
            try {
                const response = await fetch(url,{
                    method: 'GET', 
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`, 
                    },
                });
                if (response.ok) {
                    this.driver = await response.json();
                } else {
                    const error = await response.json();
                    this.setMessage(error.error || "Failed to fetch data", 'error');
                }
            } catch (error) {
                this.setMessage("Error fetching data: " + error.message, 'error');
            }
        },
        updateDriver(){
            this.selectedAction = 'updateDriver';
            this.title = 'Update driver data';
            this.editDriver = { ...this.driver };
        },
        deleteDriver(){
            this.selectedAction = 'deleteDriver';
            this.title = 'Delete driveral data (mark inactive)';
        },
        showConfirmEditModal() {
            this.editModalInstance.show();
        },
        async confirmEdit() {
            this.editModalInstance.hide();
            await this.requestUpdateDriver();
        },
        async requestUpdateDriver() {
            try {
                const token = localStorage.getItem('userToken');
                const response = await fetch(`http://localhost:8080/api/drivers/${this.driver._id}`, {
                    method: 'PUT', 
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`, 
                    },
                    body: JSON.stringify(this.editDriver)
                });
                console.log(response);
                if (response.ok) {
                    this.setMessage("Driver updated successfully", 'success');
                    this.getDriver('getById');
                } else {
                    const error = await response.json();
                    this.setMessage(error.error || "Failed to update driver", 'error');
                }
            } catch (error) {
                this.setMessage("Error updating driver: " + error.message, 'error');
            }
        },
        showDeleteModal() {
            this.confirmationIdCard = '';
            this.deleteModalInstance.show();
        },
        async confirmDelete() {
            if (this.confirmationIdCard === this.driver.idCard) {
                await this.requestDeleteDriver(this.driver._id);
                this.hideDeleteModal(); 
            } else {
                this.hideDeleteModal();
                this.setMessage("ID Card does not match. Deletion cancelled.", 'error');
            }
        },
        hideDeleteModal() {
            this.deleteModalInstance.hide();
        },
        async requestDeleteDriver(driverId) {
            const token = localStorage.getItem('userToken');
            try {
                const response = await fetch(`http://localhost:8080/api/drivers/${driverId}`, {
                    method: 'DELETE', 
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`, 
                    },
                });
                if (response.ok) {
                    this.setMessage("Driver deleted successfully", 'success');
                    localStorage.clear();
                    window.location.reload();
                } else {
                    const error = await response.json();
                    this.setMessage(error.error || "Failed to delete driver", 'error');
                }
            } catch (error) {
                this.setMessage("Error deleting driver: " + error.message, 'error');
            }
        },
    },
    mounted(){
        const editModalElement = document.getElementById('confirmEditModal');
        this.editModalInstance = new Modal(editModalElement);
        
        const modalElement = document.getElementById('deleteModal');
        this.deleteModalInstance = new Modal(modalElement);
    }
};
</script>

<style scoped>
.my-driver {
    display: flex;
}
.card-header {
    font-size: 1.1rem;
}
.text {
    font-size: 1rem;
}
</style>