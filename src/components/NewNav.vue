<template>
    <div class="popup">
        <ul class="popup-list">
            <li @click="goToPage('onboarding')" class="popup-item">
                <img src="../assets/imgs/onboard-icon.svg" alt="">
                <p>Onboarding</p>
            </li>
            <li @click="goToPage('media-assets')" class="popup-item">
                <img src="../assets/imgs/media-assets-icon.svg" alt="">
                <p>Media Assets</p>
            </li>
            <li @click="goToPage('paid-advertising-reports')" class="popup-item">
                <img src="../assets/imgs/paid-icon.svg" alt="">
                <p>Paid Adversting Reports</p>
            </li>
            <li @click="goToPage('meeting-notes')" class="popup-item">
                <img src="../assets/imgs/meeting-icon.svg" alt="">
                <p>Meeting Notes</p>
            </li>
            <li @click="goToPage('useful-info')" class="popup-item">
                <img src="../assets/imgs/useful-icon.svg" alt="">
                <p>Useful Info</p>
            </li>
            <li @click="goToPage('contacts-details')" class="popup-item">
                <img src="../assets/imgs/contact-icon.svg" alt="">
                <p>Client Contact Details</p>
            </li>
            
        </ul>
    </div>
</template>


<script setup>
import {useRouter} from "vue-router"
const router = useRouter()

function goToPage(path){
    router.push(`/${path}`)
}
</script>

<style scoped>

.popup{
    position: fixed;
    top: 50%;
    right: 0;
    transform: translateY(-50%);
    background: white;
    z-index: 100;
   
}

.popup-list{
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
    display: flex;
    align-items: center;
}

.popup-item > img{
    width: 45px;
    padding: 10px;
}

.popup-item > p{
    color: #3873E9;
}
</style>