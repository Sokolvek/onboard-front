<template>
    <div>

        <img class="section-header" src="../assets/imgs/Group 41.svg" alt="">
        <section class="section container">
            <NavBar class="profile-nav" />
            <div class="profile-block">
                <img src="../assets/imgs/profileAvatar.svg" alt="">
                <h2>Good Day, dear {{userData.fullName}}!</h2>
                <p>Welcome! Using this page toy can access all required tools needed for onboarding. You can also<br />
                    access any notes from our meetings together and even access a record of advertissing reports.</p>
            </div>
            <div class="roadmap">
                <h3>The Roadmap</h3>
                <div class="roadmap-stages">
                    <button class="roadmap-btn" @click="index = i" :class="{ active: userData.activeStage-1 == i }" v-for="(btn, i) in data" :key="i">{{ i + 1
                    }}</button>
                </div>
                <div class="roadmap-desc">
                    <TransitionGroup name="list" tag="div" mode="out-in">
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
import { computed, onMounted, ref } from "vue"
import { useCounterStore } from "../stores/counter";
import NavBar from "../components/NavBar.vue";


const store = useCounterStore()

const index = ref(0)
const url = import.meta.env.VITE_BASE_URL

const userData = ref({})
const userStages =  userData.onboardingStages
const data = ref([
    {
        text: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Neque, odit modi. Quas repudiandae commodi quia delectus dignissimos alias! Eos, cupiditate laborum et aperiam facere culpa vel id obcaecati unde delectus?"
    },
    {
        text: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Neque, odit modi. Quas repudiandae commodi quia delectus dignissimos alias! Eos, cupiditate laborum et aperiam facere culpa vel id obcaecati unde delectus?"
    },
    {
        text: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Neque, odit modi. Quas repudiandae commodi quia delectus dignissimos alias! Eos, cupiditate laborum et aperiam facere culpa vel id obcaecati unde delectus?"
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

.roadmap-btn {
    background: transparent;
    border: 2px solid #3873E9;
    outline: none;
    width: 3em;
    height: 3em;
    border-radius: 200%;
    font-size: 30px;
    color: #3873E9;
    transition: 0.5s;
    cursor: pointer;
}

.roadmap-btn.active {
    color: white;
    background: #3873E9;
}

.roadmap-stages {
    display: flex;
    gap: 30px;
    margin-top: 30px;
}

.roadmap-desc{
    position: relative;
    margin-top: 30px;
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