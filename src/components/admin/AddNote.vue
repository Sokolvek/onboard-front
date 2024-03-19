<template>
    <div class="meeting-notes">
        <input required type="text" placeholder="header" v-model="noteHeader">
        <textarea required class="textarea" name="" id="" cols="10" rows="5" v-model="noteDesc" ></textarea>
        <button type="submit" @click.prevent="postNote">add note</button>
    </div>
</template>

<script setup>
import { ref,onMounted } from 'vue';
import {useCounterStore} from "../../stores/counter"
import {useToast} from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-sugar.css';
const $toast = useToast();
const store = useCounterStore()
const noteHeader = ref("")
const noteDesc = ref("")
const url = import.meta.env.VITE_BASE_URL

const props = defineProps({
    email:String
})
async function postNote(){
    if(noteHeader.value == "" || noteDesc.value == "") {
        $toast.open({message:"please fill the fields", type:"error", position:"top"})
        return
    }
    const body = {
        id:null,
        content:noteDesc.value,  
        header:noteHeader.value
    }
    console.log(JSON.stringify(body))
    await fetch(`${url}/note/meeting-notes/${props.email}`,{
        method:"PUT",
        headers:{ 
            "Authorization":"Bearer " + store.jwt
        },
        body:JSON.stringify(body)
    }).then((response) =>{
        if(response.status == 200){
            $toast.open({message:"success", type:"success", position:"top"})
        }else{
            $toast.open({message:"error caused", type:"error", position:"top"})
        }
        return response
    })
}


</script>

<style scoped>

.textarea{
    resize: none;
}

.meeting-notes{
    display: flex;
    flex-direction: column;
    gap: 20px;
}

.meeting-notes > button{
    width: fit-content;
}
</style>