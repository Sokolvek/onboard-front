<template>
    <div class="popup" v-if="store.reportPopupState">
        <div @click="store.reportPopupState = false" class="shadow"></div>
        <img  @click="store.reportPopupState = false" class="cross" src="../assets/imgs/cross-icon.svg" alt="">
        <div class="image-wrapper">
            <img :src="store.reportPopupUrl" alt="">
        </div>
    </div>
</template>

<script setup>
import { useCounterStore } from '../stores/counter';

const store = useCounterStore()
</script>

<style scoped>

.popup{
    top: 0;
    left: 0;
    position: fixed;
    z-index: 1000;
    width: 100%;
    height: 100svh;
}

.shadow{
    position: fixed;
    width: 100%;
    height: 100%;
    background: rgba(23, 22, 22, 0.338);
}

.image-wrapper{
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%)
}

.cross{
    top: 20px;
    right: 20px;
    position: fixed;
    cursor: pointer;
}

</style>