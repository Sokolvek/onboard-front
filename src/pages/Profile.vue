<template>
    <div>
        <NewNav/>
        <img class="section-header" src="../assets/imgs/Group 41.svg" alt="">
        <section class="section container">
            <!-- <NavBar class="profile-nav" /> -->
            <div class="profile-block">
                <img src="../assets/imgs/profileAvatar.svg" alt="">
                <h2>Goedemiddag, lieve {{userData.fullName}}! 👋</h2>
                <p>Welkom! Met behulp van het menu aan de rechterkant kunt u toegang krijgen tot alle tools die u kunnen helpen bij het onboardingproces.<br /> Ze omvatten een quiz om u een effectievere targeting te bieden, een pagina met rapporten<br /> over betaalde advertenties, en pagina's met alle notities van onze vergaderingen!</p>
            </div>
            <div class="roadmap">
                <h3>De Routekaart</h3>
                <div class="roadmap-stages">
                    <div class="stage"  @click="index = i"  v-for="(btn, i) in images" :key="i">
                    <img v-if="userData.activeStage == i+1" :src="btn.image" alt="">
                
                </div>
                </div>
                <div class="roadmap-desc">
                    <TransitionGroup name="list" class="roadmap-desc-wrapper" tag="div" mode="out-in">
                        <img src="../assets/imgs/dot-icon.svg" alt="">
                        <div v-if="userData.onboardingStages">{{ userData.onboardingStages[userData.activeStage-1] }}</div>

                    </TransitionGroup>
                </div>
                <!-- <button class="open-menu-btn" @click="store.navPopup = true">Open menu</button> -->
            </div>
            <BackHome />
        </section>
    </div>
</template>

<script setup>
import { onMounted, ref } from "vue"
import { useCounterStore } from "../stores/counter";
import NavBar from "../components/NavBar.vue";
import NewNav from "../components/NewNav.vue";

const store = useCounterStore()

const index = ref(0)
const url = import.meta.env.VITE_BASE_URL

import firstStage from "../assets/imgs/first-stage.svg"
import secondStage from "../assets/imgs/second-stage.svg"
import thirdStage from "../assets/imgs/third-stage.svg"

const userData = ref({})
const userStages =  userData.onboardingStages
const images = ref([
    {
        image: firstStage
    },
    {
        image: secondStage
    },
    {
        image: thirdStage
    },
])

async function getUserData(){
    if(localStorage.getItem("email") == null) return
    await fetch(`${url}/client/get-data/${localStorage.getItem("email")}`,{
        method:"GET",
        headers:{ 
                "Authorization":"Bearer " + store.getCookieJwt()[1]
            }
    }).then((response) => response.json())
    .then((data) => {
        userData.value = data
    })
}

onMounted(() => {
    getUserData()
    // setTimeout(() => console.log(userStages), 1000)
    
})

</script>

<style scoped>
/* .list-move, apply transition to moving elements */
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
/* .list-leave-active {
  position: absolute;
} */


.section{
        transform: translateY(-80px);
}
.v-leave-to,
.v-leave-active {
  position: absolute;
}
.section-header {
    width: 100%;
}

.profile-block {
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 30px;
    z-index: 2;

}

.profile-nav{
    position: absolute;
    top: 150px;
    left: -100px;
}

.profile-block>img {
    width: 150px;

}

.roadmap {
    margin-top: 30px;
}

h2,
h3 {
    color: #3873E9;
}

h2 {
    font-size: 2.5rem;
}

h3 {
    font-size: 2rem;
}

.stage{
    transform: translateX(-30px)
}

.roadmap-btn {
    position: relative;
    background: transparent;
    border: 2px solid #3873E9;
    outline: none;
    width: 3em;
    height: 3em;
    border-radius: 200%;
    font-size: 30px;
    color: #3873E9;
    transition: 0.5s;
}

.roadmap-btn.stage {
    color: white;
    background: #3873E9;
}

.roadmap-btn.active::before,.roadmap-btn.active::after{
    content:"";
    position: absolute;
    background-repeat: no-repeat;
    background-size: cover;
}

.roadmap-btn.active::before{
    top: -35px;
    left: -35px;
    background-image: url("../assets/imgs/profile-star-before.webp");
    width: 60px;
    height: 60px;
}

.roadmap-btn.active::after{
    right: -15px;
    bottom: -15px;
    background-image: url("../assets/imgs/profile-star-after.svg");
    width: 25px;
    height: 25px;
}

.roadmap-stages {
    display: flex;
    gap: 30px;
    margin-top: 10px;
    margin-left: 30px;
}

.roadmap-desc{
    position: relative;
    margin-top: 20px;
    margin-left: 30px;
}

.open-menu-btn{
    margin-top: 20px;
    padding: 0.375rem 0.75rem;
    border: none;
    border-radius: 3px;
    color: white;
    background-color: #0d6efd;
    font-size: 18px;
}

.roadmap-desc-wrapper{
    display: flex;
    align-items: center;
    gap: 20px;
}

/* .roadmap-text.active{
    transition: 0.5s;
    position: absolute;
    top: 0;
    left: 20%;
} */

/* .roadmap-text.active{
    
    position: relative;
    top: 0;
    left: 0;
} */
</style>