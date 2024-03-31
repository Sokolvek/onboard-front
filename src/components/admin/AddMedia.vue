<template>
    <div class="add-media">
        <header>
            <h2>Add media</h2>
        </header>
        <input type="text" placeholder="report title"  v-model="title">
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
const files = []
const title = ref("")
const url = import.meta.env.VITE_BASE_URL

function onFileChange(e) {
    files.push(e.target.files[0])
    file.value = e.target.files;
    console.log(files,  files[0])
}

const props = defineProps({
    email:String
})
async function addMedia(){
    if(!file.value) {
        $toast.open({message:"please add media file", type:"error", position:"top"})
        return
    }

   
    
    console.log(files)
    const formData = new FormData()
    formData.append("clientEmail", props.email)
    formData.append("files", file.value[0])
    formData.append("reportName", title.value)
    await fetch(`${url}/report/${props.email}`,
        {
            method:"PUT",
            headers:{
                "Authorization":"Bearer " + store.jwt
            },
            body:formData
        }
    ).then((response) => {
        console.log(response)
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