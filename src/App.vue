<template>
  <div>
    <ul class="nav nav-tabs">
      <!-- Left-aligned tabs -->
      <li class="nav-item">
        <router-link class="nav-link" :class="{ active: $route.path === '/' }" to="/">My Data</router-link>
      </li>
      <li class="nav-item">
        <router-link class="nav-link" :class="{ active: $route.path === '/' }" to="/">My Cars</router-link>
      </li>
      
      <!-- Spacer to push next items to the right -->
      <li class="ms-auto"></li>
      
      <!-- Right-aligned tabs -->
      <li v-if="this.getUser()==null" class="nav-item">
        <router-link class="nav-link" :class="{ active: $route.path === '/register' }" to="/register">Register</router-link>
      </li>
      <li v-if="this.getUser()==null" class="nav-item">
        <router-link class="nav-link" :class="{ active: $route.path === '/login' }" to="/login">Login</router-link>
      </li>
      
      
    </ul> 
    <div class="right-container d-flex justify-content-end" v-if="this.getUser()!=null">
      <div class="right-square">
        <p>{{ this.getUser().username }}</p>
        <button class="btn btn-danger" @click="logout">Logout</button>
      </div>
    </div>
    
    <div>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
  methods: {
    logout(){
      console.log("Deleting");
      localStorage.clear();
      window.location.reload();
    }
  }
};
</script>

<style>
.nav-tabs {
  display: flex;
  justify-content: space-between;
  flex-wrap: nowrap; /* Ensure the tabs don't wrap to the next line */
}
.right-container {
  padding-top: 10px; /* Add some padding from the top */
}
.right-form {
  width: 100%; /* Full width on small screens */
  max-width: 360px; /* Limit the form width to 360px */
  padding: 20px; /* Add some padding */
  background-color: #fff; /* White background */
  border: 1px solid #ddd; /* Light gray border */
  border-radius: 5px; /* Rounded corners */
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1); /* Add a subtle shadow */
}

/* Ensure that on small screens the form takes up the entire width */
@media (max-width: 768px) {
  .right-form {
    margin-right: 0; /* Remove right margin on small screens */
    margin-left: auto; /* Center form horizontally on small screens */
  }
}
.right-square {
  width: 100%; /* Full width on small screens */
  max-width: 150px; /* Limit the form width to 360px */
  padding: 20px; /* Add some padding */
  background-color: #fff; /* White background */
  border: 1px solid #ddd; /* Light gray border */
  border-radius: 5px; /* Rounded corners */
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1); /* Add a subtle shadow */
}
@media (max-width: 768px) {
  .right-square {
    margin-right: 0; /* Remove right margin on small screens */
    margin-left: auto; /* Center form horizontally on small screens */
  }
}
</style>
