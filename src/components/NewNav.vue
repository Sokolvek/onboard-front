<template>
    <div class="popup">
        <ul class="popup-list">
            <li v-for="(item,i) in items" :class="{active : i === store.navIndex}" class="popup-item" :key="i"  @click="goToPage(item.name, i)" >
            <img :src="item.icon" alt="">
            <p>{{ item.title }}</p>
        </li>
        </ul>
    </div>
</template>


<script setup>
import {useRouter} from "vue-router"
import { useCounterStore } from "../stores/counter";
import {ref} from "vue"
const router = useRouter()
const store = useCounterStore()

import onBoard from "../assets/imgs/quiz.svg"
import mediaAssets from "../assets/imgs/media-assets-icon.svg"
import reports from "../assets/imgs/paid-icon.svg"
import notes from "../assets/imgs/meeting-icon.svg"
import info from "../assets/imgs/useful-icon.svg"
import contact from "../assets/imgs/contact-icon.svg"

const items = [
                { name: 'onboarding', icon: onBoard, title: 'Onboarding' },
                { name: 'media-assets', icon: mediaAssets, title: 'Media Assets' },
                { name: 'paid-advertising-reports', icon: reports, title: 'Paid Advertising Reports' },
                { name: 'meeting-notes', icon: notes, title: 'Meeting Notes' },
                { name: 'useful-info', icon: info, title: 'Useful Info' },
                { name: 'contacts-details', icon: contact, title: 'Client Contact Details' },
            ]

function goToPage(name, index){
    router.push(`/${name}`)
    
    store.navIndex = index
}
</script>

<style scoped>

.popup{
    position: fixed;
    top: 30%;
    right: 0;

    background: rgba(255, 255, 255, 0);
    z-index: 100;
   
}

.popup-list{
    overflow: hidden;
    display: flex;
    flex-direction: column;
    transform: translateX(72%);
    transition: 1s;
    border-bottom-left-radius: 8px;
    border-top-left-radius: 8px;
    border-right: none;
    padding-left: 15px;
    padding-top: 15px;
    padding-bottom: 15px;

}

.popup-list:hover{
    transform: translateX(0%);
}

.popup-item{
    transition: .2s;
    display: flex;
    align-items: center;
    cursor: pointer;
    border-bottom-left-radius: 8px;
    border-top-left-radius: 8px;
    background: white;
    padding-right: 30px;
}

.popup-item:hover {
    box-shadow: 0px 0px 10px 0px #82858d;
    position: relative;
}

.popup-item > img{
    width: 45px;
    max-height: 50px;
    padding: 10px 30px 10px 10px;
}

.popup-item > p{
    color: #3873E9;
}

.popup-item.active{
    background: #ebf0fa;
}
</style>