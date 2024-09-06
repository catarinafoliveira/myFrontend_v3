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
      <li class="nav-item">
        <router-link class="nav-link" :class="{ active: $route.path === '/' }" to="/">Register</router-link>
      </li>
      <li class="nav-item">
        <router-link class="nav-link" :class="{ active: $route.path === '/login' }" to="/login">Login</router-link>
      </li>
    </ul>
    
    <div>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
};
</script>

<style scoped>
.nav-tabs {
  display: flex;
  justify-content: space-between;
  flex-wrap: nowrap; /* Ensure the tabs don't wrap to the next line */
}
</style>
