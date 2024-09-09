<template>
    <table style="margin-left: 20px;" class="w-auto table table-hover">
        <thead>
            <tr>
                <th></th>
                <th>Name</th>
                <th>Id Card</th>
                <th>Licence</th>
                <th></th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="person in data" :key="person._id">
                <td>
                    <img v-if="person.status=='inactive'" src="/inactive.png"/>
                </td>
                <td>{{ person.name }}</td>
                <td>{{ person.idCard }}</td>
                <td>{{ person.licence }}</td>
                <td>
                    <img src="/edit.png" @click="toggleEdit(person)">
                    <img src="/delete.png" @click="showDeleteModal(person)">
                </td>
            </tr>
        </tbody>
    </table>
    <img style="margin-left: 20px;" src="/add.png" @click="toggleAdd()">
    <div>
        <div class="container">
            <div class="row">
                <div class="col-md-3">
                    <!-- Edit Form -->
                    <form v-if="edit" @submit.prevent="showConfirmEditModal">
                        <h5>Edit Driver:</h5>
                        <div class="row mb-3">
                            <div class="col-md-4">
                                <label for="nameField" class="form-label">Name:</label>
                            </div>
                            <div class="col-md-8">
                                <input type="text" class="form-control" id="nameField" v-model="activePerson.name">
                            </div>
                        </div>
                        <div class="row mb-3">
                            <div class="col-md-4">
                                <label for="idField" class="form-label">Id Card:</label>
                            </div>
                            <div class="col-md-8">
                                <input type="text" class="form-control" id="idField" v-model="activePerson.idCard">
                            </div>
                        </div>
                        <div class="row mb-3">
                            <div class="col-md-4">
                                <label for="licenceField" class="form-label">Licence:</label>
                            </div>
                            <div class="col-md-8">
                                <input type="text" class="form-control" id="licenceField" v-model="activePerson.licence">
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-12 d-flex justify-content-end">
                                <button type="button" class="btn btn-danger me-2" @click="cancelEdit">Cancel</button>
                                <button type="submit" class="btn btn-success">Confirm</button>
                            </div>
                        </div>
                    </form>    

                    <!-- Add form -->
                    <form v-if="add" @submit.prevent="showConfirmModal">
                        <h5>Add Person:</h5>
                        <div class="row mb-3">
                            <div class="col-md-4">
                                <label for="nameField" class="form-label">Name:</label>
                            </div>
                            <div class="col-md-8">
                                <input type="text" class="form-control" id="nameField" v-model="newPerson.name">
                            </div>
                        </div>
                        <div class="row mb-3">
                            <div class="col-md-4">
                                <label for="idField" class="form-label">Id Card:</label>
                            </div>
                            <div class="col-md-8">
                                <input type="text" class="form-control" id="idField" v-model="newPerson.idCard">
                            </div>
                        </div>
                        <div class="row mb-3">
                            <div class="col-md-4">
                                <label for="licenceField" class="form-label">Licence:</label>
                            </div>
                            <div class="col-md-8">
                                <input type="text" class="form-control" id="licenceField" v-model="newPerson.licence">
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-12 d-flex justify-content-end">
                                <button type="button" class="btn btn-danger me-2" @click="cancelAdd">Cancel</button>
                                <button type="submit" class="btn btn-success">Confirm</button>
                            </div>
                        </div>
                    </form>   
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
                        You are about to delete the person:<br>
                        <strong>Name:</strong> {{ activePerson.name }}<br>
                        <strong>ID Card:</strong> {{ activePerson.idCard }}<br>
                        <p>Are you sure? Please enter the ID card to confirm:</p>
                        <input type="text" v-model="confirmationIdCard" class="form-control" placeholder="Enter ID Card">
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" @click="hideDeleteModal">Cancel</button>
                        <button type="button" class="btn btn-danger" @click="confirmDelete">Delete</button>
                    </div>
                </div>
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
                        You are about to create a new person with the folowing data:
                        <strong>Name:</strong> {{ newPerson.name }}<br>
                        <strong>ID Card:</strong> {{ newPerson.idCard }}<br>
                        <strong>Driver's Licence:</strong> {{ newPerson.licence }}<br><br>
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
                    <div v-if="oldPerson.name!=activePerson.name || oldPerson.idCard!=activePerson.idCard || oldPerson.licence!=activePerson.licence" class="modal-body">
                        You are about to edit the person with the folowing data:<br>
                        <strong>Name:</strong> {{oldPerson.name}} <span v-if="oldPerson.name!=activePerson.name">&rarr; {{ activePerson.name }}</span><br>
                        <strong>ID Card:</strong> {{oldPerson.idCard}} <span v-if="oldPerson.idCard!=activePerson.idCard">&rarr; {{ activePerson.idCard }}</span><br>
                        <strong>Licence:</strong> {{oldPerson.licence}} <span v-if="oldPerson.licence!=activePerson.licence">&rarr; {{ activePerson.licence }}</span><br><br>
                        Are you sure?
                    </div>
                    <div v-else class="modal-body">
                        No changes were made.
                    </div>
                    <div v-if="oldPerson.name!=activePerson.name || oldPerson.idCard!=activePerson.idCard || oldPerson.licence!=activePerson.licence" class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                        <button type="button" class="btn btn-primary" @click="confirmEdit">Confirm</button>
                    </div>
                    <div v-else class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Exit</button>
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
            add: false,
            edit: false,
            activePerson: {
                name: '',
                idCard: '',
                isDriver: false,
                licence: ''
            },
            oldPerson: {
                name: '',
                idCard: '',
                isDriver: false,
                licence: ''
            },
            newPerson: {
                name: '',
                idCard: '',
                isDriver: false,
                licence: ''
            },
            message: '',
            alertClass: '',
            confirmationIdCard: '', 
            deleteModalInstance: null,
        };
    },
    methods: {
        resetDriver(){
            return {
                name: '',
                idCard: '',
                isDriver: false,
                licence: ''
            };
        },
        async fetchData() {
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
                    this.data = await response.json();
                } else {
                    const error = await response.json();
                    this.setMessage(error.error || "Failed to fetch data", 'error');
                }
            } catch (error) {
                this.setMessage("Error fetching data: " + error.message, 'error');
            }
        },
        toggleEdit(person) {
            this.edit =!this.edit;
            this.add = false;
            this.activePerson = { ...person };
            this.oldPerson.name = this.activePerson.name;
            this.oldPerson.idCard= this.activePerson.idCard;
            this.oldPerson.licence= this.activePerson.licence;
        },
        toggleAdd() {
            this.newPerson = this.resetDriver();
            this.add = !this.add;
            this.edit = false;
            
        },
        async updatePerson() {
            const token = localStorage.getItem('userToken');
            try {
                const response = await fetch(`http://localhost:8080/api/drivers/${this.activePerson._id}`, {
                    method: 'PUT', 
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`, 
                    },
                    body: JSON.stringify(this.activePerson)
                });
                console.log(response);
                if (response.ok) {
                    await this.fetchData();
                    this.edit = false;
                    this.activePerson = this.resetDriver();
                    this.setMessage("Driver updated successfully", 'success');
                } else {
                    const error = await response.json();
                    this.setMessage(error.error || "Failed to update driver", 'error');
                }
            } catch (error) {
                this.setMessage("Error updating driver: " + error.message, 'error');
            }
        },
        showConfirmModal() {
            this.addModalInstance.show();
        },
        showConfirmEditModal() {
            this.editModalInstance.show();
        },
        async confirmSubmit() {
            this.addModalInstance.hide()
            await this.addPerson();
        },
        async confirmEdit() {
            this.editModalInstance.hide()
            await this.updatePerson();
        },
        async addPerson() {
            const token = localStorage.getItem('userToken');
            try {
                const endpoint = "http://localhost:8080/api/drivers";
                
                const response = await fetch(endpoint, {
                    method: 'POST', 
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`, 
                    },
                    body: JSON.stringify(this.newPerson)
                });
                
                if (response.ok) {
                    await this.fetchData();
                    this.setMessage("Driver added successfully", 'success');
                    this.newPerson = this.resetDriver();
                    this.add = false; 
                } else {
                    const error = await response.json();
                    this.setMessage(error.error || "Failed to add driver", 'error');
                }
            } catch (error) {
                this.setMessage("Error adding person: " + error.message, 'error');
            }
        },
        async deletePerson(personId) {
            const token = localStorage.getItem('userToken');
            try {
                const response = await fetch(`http://localhost:8080/api/drivers/${personId}`, {
                    method: 'DELETE', 
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`, 
                    },
                });
                if (response.ok) {
                    await this.fetchData();
                    this.setMessage("Driver deleted successfully", 'success');
                } else {
                    const error = await response.json();
                    this.setMessage(error.error || "Failed to delete driver", 'error');
                }
            } catch (error) {
                this.setMessage("Error deleting driver: " + error.message, 'error');
            }
        },
        showDeleteModal(person) {
            this.activePerson = person;
            this.confirmationIdCard = '';
            this.deleteModalInstance.show();
        },
        hideDeleteModal() {
            this.deleteModalInstance.hide();
        },
        async confirmDelete() {
            if (this.confirmationIdCard === this.activePerson.idCard) {
                await this.deletePerson(this.activePerson._id);
                this.hideDeleteModal(); 
            } else {
                this.hideDeleteModal();
                this.setMessage("ID Card does not match. Deletion cancelled.", 'error');
            }
        },
        cancelEdit() {
            this.edit = false;
        },
        cancelAdd() {
            this.add = false;
            this.newPerson = this.resetDriver();
        },
        setMessage(msg, type) {
            this.message = msg;
            this.alertClass = type === 'success' ? 'alert alert-success' : 'alert alert-danger';
            setTimeout(() => this.message = '', 5000);
        }
    },
    mounted() {
        this.fetchData();
        const modalElement = document.getElementById('deleteModal');
        this.deleteModalInstance = new Modal(modalElement);
        
        const addModalElement = document.getElementById('confirmModal');
        this.addModalInstance = new Modal(addModalElement);
        
        const editModalElement = document.getElementById('confirmEditModal');
        this.editModalInstance = new Modal(editModalElement);
    }
};
</script>