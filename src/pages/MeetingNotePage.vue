<template>
    <section class="container">
        <header class="header">
            <div class="header-title">
                <img src="../assets/imgs/meeting-icon.svg" alt="">
                <div v-if="noteData">
                    <h2>{{ noteData.header }}</h2>
                </div>
            </div>
            <BackHome />
        </header>
        <div class="tips" v-if="noteContent">
            <img src="../assets/imgs/dot-icon.svg" alt="">
            <span>{{ noteContent }}</span>
    </div>
    </section>    
</template>

<script setup>
import { useRoute } from 'vue-router';
import { onMounted, ref } from 'vue';
import { useCounterStore } from '../stores/counter';
import BackHome from '../components/BackHome.vue';
const route = useRoute()
const store = useCounterStore()

const url = import.meta.env.VITE_BASE_URL
const noteId = route.params.id
const noteData = ref({})
const noteContent = ref()

async function getNoteById(){
    await fetch(`${url}/note/meeting-notes/${localStorage.getItem("email")}/${noteId}`,{
        method:"GET",
        headers:{ 
            "Authorization":"Bearer " + store.jwt
        },
    }).then((response) => response.json())
    .then((data) => {
        noteData.value = data.meetingNote
        noteContent.value = noteData.value.content
    })
}
onMounted(() => {
    console.log(route.params)
    getNoteById()
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

.tips{
    display: flex;
    align-items: center;
    gap: 10px;
    margin-top: 40px;
}

.tip{
    display: flex;
    align-content: center;
    gap: 10px;
}

.tip > span{
    color: #575757;
}
</style>