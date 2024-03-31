<template>
    <div>
        <header>
            <h2>All reports</h2>
            <button @click="showReports = !showReports" >{{ showReports ? "close" : "show" }}</button>
        </header>
        <ul v-show="showReports">
            <li v-for="report in reports" :key="report.reportId">
                <p>{{ report.reportData.name }}</p>
                <button @click="deleteReport(report.reportId)">X</button>
            </li>
        </ul>

    </div>
</template>

<script setup>
import {onMounted, ref} from "vue"
import { useCounterStore } from '../../stores/counter';

let showReports = ref(false)
const url = import.meta.env.VITE_BASE_URL
const store = useCounterStore()
const props = defineProps({
    email:String
})
const reports = ref([])

async function getReports(){
    await fetch(`${url}/report/${props.email}`,
    {
        method:"GET",
        headers:{ 
            "Authorization":"Bearer " + store.jwt
        },
    }).then((response) => {
        console.log("aaaa")
        return response.json()})
    .then((data) => {
       reports.value = data.reports
    })
}

async function deleteReport(id){
    await fetch(`${url}/report/${id}`,
    {
        method:"DELETE",
        headers:{ 
            "Authorization":"Bearer " + store.jwt
        },
    }).then((response) => {
        console.log("aaaa")
        return response.json()})
    .then((data) => {
       reports.value = data.reports
    })
}

onMounted(() => {
    getReports()
})
</script>

<style scoped>

li{
    display: flex;
    gap: 10px;

}
</style>