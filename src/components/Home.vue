<template>
    <p>Welcome,</p>
    <p v-if="this.getUser()!=null">{{ this.getUser().username }}!</p>
    <p v-else>Guest user!</p>
</template>

<script>
// export default {
//     mounted(){
//         if(this.getUser()==null){
//             this.$router.push('/login');
//         }
//     }
// }
</script>