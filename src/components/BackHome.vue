<template>
    <router-link to="/" class="profile">
        <img src="../assets/imgs/profileAvatar.svg" alt="">
    </router-link>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';

</script>

<style scoped>

.profile{
    position: fixed;
    bottom: 40px;
    right: 40px;

}

.profile > img{
    width: 100px;
}

</style>