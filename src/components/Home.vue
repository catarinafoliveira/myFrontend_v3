<template>
    <p v-if="this.getUser()!=null">Username: {{ this.getUser().username }}</p>
</template>