<template>
    <section class="container">
        <header class="header">
            <div class="header-title">
                <img src="../assets/imgs/meeting-icon.svg" alt="">
                <div>
                    <h2>Meeting notes</h2>
                    <p>Notes from previous meetings. New appointments.</p>
                </div>
            </div>
            <NavBar />
        </header>
        <ul v-if="notes.meetingNotes">
            <li @click="gotoPage(note.id)" v-for="(note, i) in notes.meetingNotes" :key="i">
                <header>
                    <h3>{{ note.header }}</h3>
                    <p class="note-text">{{ note.date }}</p>
                </header>
                <p class="note-text"> {{ note.content }}</p>
            </li>
        </ul>
     
        <!-- {{ notes }} -->
        <BackHome />
        <!-- <Toast /> -->
    </section>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useCounterStore } from '../stores/counter';
import NavBar from '../components/NavBar.vue';
import BackHome from "../components/BackHome.vue"
const url = import.meta.env.VITE_BASE_URL
import { useRouter } from 'vue-router';
const notes = ref({})
const store = useCounterStore()
const router = useRouter()
import {useToast} from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-sugar.css';

const $toast = useToast();



function gotoPage(id){
router.push(`/meeting-notes/meeting-note-page/${localStorage.getItem("email")}/${id}`);
}

async function getNotes(){
    await fetch(`${url}/note/meeting-notes/${localStorage.getItem("email")}`,
    {
        method:"GET",
        headers:{ 
            "Authorization":"Bearer " + store.jwt
        },
    })
    .then((response) => {
        console.log(response)
        return response.json()})
    .then((data) => {
        console.log(data)
        notes.value = data})
}

onMounted(() => {
    getNotes()
})

</script>

<style scoped>

section{
    margin-top: 100px;
}

.header{
    display: flex;
    gap: 20px;
    justify-content: space-between;
    align-items: center;
    
}

.header-title{
    display: flex;
    gap: 20px;
   
}

.header-title > img{
    width: 50px;
}

.header-title > div > h2{
    color: #0d6efd;
    font-size: 50px;
}

ul{
    display: flex;
    flex-direction: column;
    gap: 20px;
    margin-top: 40px;
}

li{
    width: 100%;
    padding: 20px;
    background: rgb(193, 207, 221);
    border-radius: 15px;
}

h2,h3{
    color: #0d6efd;
}

li > header{
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
}

.note-text{
    color: #0d6efd;
}
</style>