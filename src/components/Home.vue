<template>
    <p v-if="this.getUser()!=null">Username: {{ this.getUser().username }}</p>
</template>

<script>
export default {
    mounted(){
        if(this.getUser()==null){
            this.$router.push('/login');
        }
    }
}
</script>