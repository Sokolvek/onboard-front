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

import onBoard from "../assets/imgs/onboard-icon.svg"
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

function goToPage(path, index){
    router.push(`/${path}`)
    
    store.navIndex = index
    console.log(itemIndex)
}
</script>

<style scoped>

.popup{
    position: fixed;
    top: 40%;
    right: 0;
    
    background: white;
    z-index: 100;
   
}

.popup-list{
    overflow: hidden;
    display: flex;
    flex-direction: column;
    transform: translateX(72%);
    transition: 1s;
    border: 1px solid black;
    border-bottom-left-radius: 8px;
    border-top-left-radius: 8px;
    border-right: none;

}

.popup-list:hover{
    transform: translateX(0%);
}

.popup-item{
    transition: .5s;
    display: flex;
    align-items: center;
    cursor: pointer;
}

.popup-item:hover{
    box-shadow: -5px 0px 15px 0px #00000040;

}

.popup-item > img{
    width: 45px;
    padding: 10px;
}

.popup-item > p{
    color: #3873E9;
}

.popup-item.active{
    background: #3873E926;
}
</style>