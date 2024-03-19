<template>
    <div class="contact-details">
        <h2>Change contacts details</h2>
        <input type="text" v-model="contactOne">
        <button @click.prevent="changeUsefulNote">change contact</button>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useCounterStore } from '../../stores/counter';
import {useToast} from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-sugar.css';
const $toast = useToast();
const props = defineProps({
    email:String
})
const store = useCounterStore()
const url = import.meta.env.VITE_BASE_URL
const contactOne = ref("")
const contactTwo = ref("")
function formatDate(){
    const date = new Date();
    const year = date.getFullYear();
    const month = `0${date.getMonth() + 1}`.slice(-2);
    const day = `0${date.getDate()}`.slice(-2);
    const formattedDate = `${year}-${month}-${day}`;
    return formattedDate
}

async function changeUsefulNote(){
    if(contactOne.value == "") {
        $toast.open({message:"please fill the field", type:"error", position:"top"})
        return
    }
    const body = {
        content:contactOne.value.split(" "),
        date:formatDate()
    }
    await fetch(`${url}/note/contact-details/${props.email}`,{
        method: "PUT",
        headers:{
            "Authorization":"Bearer " + store.jwt
        },
        body:JSON.stringify(body)
    }).then((response) => {
        if(response.status == 200){
            $toast.open({message:"success", type:"success", position:"top"})
        }else{
            $toast.open({message:"error caused", type:"error", position:"top"})
        }
    })
}


</script>

<style scoped>
.contact-details{
    display: flex;
    flex-direction: column;
    gap: 20px;
}

.contact-details > button{
    width: fit-content;
}
</style>