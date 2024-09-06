<template>
    <p>Token: {{ token }}</p>
</template>

<script>
export default {
    data() {
        return {
            token: ''
        };
    },
    methods: {
        getToken(){
            this.token = localStorage.getItem('userToken');
        }
    },
    mounted(){
        this.getToken();
    }
};
</script>