<template>
    <div class="add-media">
        <header>
            <h2>Add media</h2>
        </header>
        <input type="file" @change="onFileChange">
        <button @click.prevent="addMedia">add image</button>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useCounterStore } from '../../stores/counter';
import {useToast} from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-sugar.css';
const $toast = useToast();
const store = useCounterStore()
const file = ref()
const url = import.meta.env.VITE_BASE_URL

function onFileChange(e) {
    file.value = e.target.files;
    console.log(file.value[0])
}

const props = defineProps({
    email:String
})
async function addMedia(){
    if(!file.value) {
        $toast.open({message:"please add media file", type:"error", position:"top"})
        return
    }

   
    
    console.log(file.value[0])
    const formData = new FormData()
    formData.append("clientEmail", props.email)
    formData.append("files", file.value[0])
    await fetch(`${url}/image/paid-advertising-reports/${props.email}`,
        {
            method:"PUT",
            headers:{
                "Authorization":"Bearer " + store.jwt
            },
            body:formData
        }
    ).then((response) => {
        if(response.status == 200){
            $toast.open({message:"success", type:"success", position:"top"})
        }else{
            $toast.open({message:"error caused", type:"error", position:"top"})
        }
    })
}
</script>

<style scoped>

.add-media{
    display: flex;
    flex-direction: column;
}

.add-media > button{
    width: fit-content;
}

</style>