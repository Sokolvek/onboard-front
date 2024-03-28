<template>
    <div class="report-slider">
        <div class="slide-counter">
            <span>{{ imgIndex+1 }}/{{ props.imgs.length }}</span>
        </div>
        <div class="arrow left-arrow" @click="prev()">
            <img src="../assets/imgs/arrow-icon.svg" alt="">
        </div>
        <div class="arrow right-arrow" @click="next()">
            <img src="../assets/imgs/arrow-icon.svg" alt="">
        </div>
        <div class="report-img-wrapper" v-for="(image,i) in props.imgs" :key="i">
            <img class="report-img" @click="openImage(image)" v-if="i === imgIndex" :src="image" alt="">
        </div>
    </div>
</template>

<script setup>
import {onMounted, ref} from "vue"
import { useCounterStore } from "../stores/counter"

const store = useCounterStore()
const imgIndex = ref(0)

function openImage(url){
  store.reportPopupUrl = url
  store.reportPopupState = true
}

function next(){
    if(imgIndex.value == props.imgs.length-1){
        imgIndex.value = 0
        return
    }
    imgIndex.value++
}

function prev(){
    if(imgIndex.value == 0){
        return
    }
    imgIndex.value--
}

const props = defineProps({
    imgs:String
})

onMounted(() => {
    console.log(props.imgs)
})
</script>

<style scoped>

.report-slider{
    z-index: 1;
    position: relative;
}

.report-img-wrapper{
    position: relative;
    z-index: 0;
    min-width: 350px;
    max-height: 160px;
    overflow: hidden;
}

.report-img-wrapper::before{
    content: "";
    position: absolute;
    z-index: 2;
    left: 0;
    top: 0;
    background: linear-gradient(270deg, rgba(56, 115, 233, 0) 0%, rgba(56, 115, 233, 0.8) 100%);
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;
    width: 20%;
    height: 100%;
}

.report-img-wrapper::after{
    content: "";
    position: absolute;
    z-index: 2;
    right: 0;
    top: 0;
    background: linear-gradient(90deg, rgba(56, 115, 233, 0) 0%, rgba(56, 115, 233, 0.8) 100%);
    width: 20%;
    height: 100%;
}

.report-img-wrapper > img{
    border-bottom-left-radius: 10px;
    border-top-left-radius: 10px;
    width: 350px;
    height: 160px;
}

.report-img{
    width: 100%;
    height: 100%;
}


.no-img{
    display: none;
}

.arrow{
    position: absolute;
    z-index: 2;
    top: 50%;
    transform: translateY(-50%);
    cursor: pointer;
}

.left-arrow{
    left: 10px;
}

.right-arrow{
    right: 10px;
    transform: translateY(-50%) rotate(-180deg)
}

.slide-counter{
    display: flex;
    justify-content: center;
    position: absolute;
    z-index: 1;
    left: 50%;
    top: -15px;
    width: 35%;
    transform: translateX(-50%);
    background: white;
    border: 2px solid #3873E9;
    border-radius: 10px;
    padding: 5px;
}

.slide-counter > span{
    color: #3873E9;
    font-size: 20px;
}
</style>