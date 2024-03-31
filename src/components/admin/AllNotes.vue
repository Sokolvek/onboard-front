<template>
    <div>
        <header>
            <h2>All Meeting notes</h2>
            <button @click="showNotes = !showNotes" >{{ showNotes ? "close" : "show" }}</button>
        </header>
        <ul v-show="showNotes">
            <li v-for="note in notes" :key="note.id">
                <p>{{ note.header }}</p>
                <button @click="deleteNote(note.id)">X</button>
            </li>
        </ul>

    </div>
</template>

<script setup>
import {onMounted, ref} from "vue"
import { useCounterStore } from '../../stores/counter';

let showNotes = ref(false)
const url = import.meta.env.VITE_BASE_URL
const store = useCounterStore()
const props = defineProps({
    email:String
})
const notes = ref([])

async function getNotes(){
    await fetch(`${url}/note/meeting-notes/${props.email}`,
    {
        method:"GET",
        headers:{ 
            "Authorization":"Bearer " + store.jwt
        },
    }).then((response) => {
        console.log("aaaa")
        return response.json()})
    .then((data) => {
       notes.value = data.meetingNotes
    })
}

async function deleteNote(id){
    await fetch(`${url}/report/${id}`,
    {
        method:"DELETE",
        headers:{ 
            "Authorization":"Bearer " + store.jwt
        },
    }).then((response) => {
        return response.json()})
    .then((data) => {
       notes.value = data.meetingNotes
    })
}

onMounted(() => {
    getNotes()
})
</script>

<style scoped>

li{
    display: flex;
    gap: 10px;

}
</style>