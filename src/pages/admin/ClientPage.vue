<template>
    <section class="container">
        <button @click="router.back(1)">back</button>
        <header>
            <h2>{{ userData.fullName }}</h2>
            <div>
                <p>{{ route.params.email }}</p>
            </div>
        </header>
        <form action="">
            <div class="stage-changer">
                <h2>Choosen stage {{ userData.activeStage }}</h2>
                <p>Client progress</p>
                <div>
                    <input type="radio" v-for="i in 3" :key="i" v-model="indexStage" :value="i">
                    
                </div>
                <input type="text" v-model="stageText">
                <p>{{ userData.onboardingStages }}</p>
                <button @click.prevent="changeStage">change stage</button>
            </div>
            <div class="meeting-notes">
                <h2>Add new note:</h2>
                <AddNote :email="route.params.email" />
            </div>
            <ChangeUsefulNote :email="route.params.email" />
            <ChangeContacts :email="route.params.email" />
            <AddMedia :email="route.params.email" />
        </form>
    </section>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useCounterStore } from "../../stores/counter";
import AddNote from "../../components/admin/AddNote.vue"
import ChangeUsefulNote from "../../components/admin/ChangeUsefulNote.vue"
import ChangeContacts from "../../components/admin/ChangeContacts.vue"
import AddMedia from "../../components/admin/AddMedia.vue"

const store = useCounterStore()
const url = import.meta.env.VITE_BASE_URL
const route = useRoute()
const router = useRouter()
const user = route.params
const userData = ref({})
const indexStage = ref(1)
// const userStages = ref("");
const stageText = ref("")

async function getClientData(){
    await fetch(`${url}/client/get-data/${route.params.email}`,
    {
        method:"GET",
        headers:{ 
            "Authorization":"Bearer " + store.jwt
        },
    }).then((response) => response.json())
    .then((data) => {
        console.log(data)
        userData.value = data
        // userStages.value = [...data.onboardingStages]
        indexStage.value = data.activeStage
    })
}

async function changeStage(){
    let changedStageText = userData.value.onboardingStages;
    changedStageText[indexStage.value-1] = stageText.value
    console.log(changedStageText, stageText.value, indexStage.value)
    const body = {
        email: route.params.email,
        onboardingStages: changedStageText,
        // formAnswers:userData.value.formAnswers,
        activeStage: indexStage.value,
    }
    await fetch(`${url}/client/${route.params.email}`,{
        method:"POST",
        headers:{ 
            "Authorization":"Bearer " + store.jwt
        },
        body:JSON.stringify(body)
    })
    .then((response) => console.log(response))
}

onMounted(() =>{
    console.log(route.params.email)
    getClientData()
})
</script>

<style scoped>
form{
    background: #cbd0d6 ;
    padding: 40px;
}
</style>