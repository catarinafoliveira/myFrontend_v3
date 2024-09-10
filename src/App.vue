<template>
  <div>
    <!-- Guest User -->
    <ul v-if="this.getUser()==null" class="nav nav-tabs">
      <!-- Left-aligned tabs -->
      <li class="nav-item">
        <router-link class="nav-link" :class="{ active: $route.path === '/' }" to="/"> <img style="margin-left: 10px;" src="/home.png"> Home </router-link>
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
    
    <!-- Employee -->
    <ul v-else-if="this.getUserRole()=='employee'" class="nav nav-tabs">
      <!-- Left-aligned tabs -->
      <li class="nav-item">
        <router-link class="nav-link" :class="{ active: $route.path === '/' }" to="/"> <img style="margin-left: 10px;" src="/home.png"> Home </router-link>
      </li>
      <li class="nav-item">
        <router-link class="nav-link" :class="{ active: $route.path === '/persons' }" to="/persons"><img style="margin-left: 10px;" src="/user.png"> Persons </router-link>
      </li>
      <li class="nav-item">
        <router-link class="nav-link" :class="{ active: $route.path === '/drivers' }" to="/drivers"><img style="margin-left: 10px;" src="/driver.png"> Drivers </router-link>
      </li>
      <li class="nav-item">
        <router-link class="nav-link" :class="{ active: $route.path === '/cars' }" to="/cars"><img style="margin-left: 10px;" src="/car.png"> Cars </router-link>
      </li>
      <!-- Spacer to push next items to the right -->
      <li class="ms-auto"></li>
      
      <!-- Logout button, to the right-->
      <button class="btn btn-danger" @click="logout">Logout</button>
    </ul>

    <!-- Driver -->
    <ul v-else-if="this.getUserRole()=='driver'" class="nav nav-tabs">
      <!-- Left-aligned tabs -->
      <li class="nav-item">
        <router-link class="nav-link" :class="{ active: $route.path === '/' }" to="/"> <img style="margin-left: 10px;" src="/home.png"> Home </router-link>
      </li>
      <li class="nav-item">
        <router-link class="nav-link" :class="{ active: $route.path === '/person' }" to="/person"><img style="margin-left: 10px;" src="/user.png"> My Personal Data </router-link>
      </li>
      <li class="nav-item">
        <router-link class="nav-link" :class="{ active: $route.path === '/driver' }" to="/driver"><img style="margin-left: 10px;" src="/driver.png"> My Driver Data </router-link>
      </li>
      <li class="nav-item">
        <router-link class="nav-link" :class="{ active: $route.path === '/mycars' }" to="/mycars"><img style="margin-left: 10px;" src="/car.png"> My Cars </router-link>
      </li>
      <!-- Spacer to push next items to the right -->
      <li class="ms-auto"></li>
      
      <!-- Logout button, to the right-->
      <button class="btn btn-danger" @click="logout">Logout</button>
    </ul>
    
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

</style>
