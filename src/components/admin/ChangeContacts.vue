<template>
    <header>
        <h2>Change contacts details</h2>
    </header>
    <div class="contact-details">
        <textarea required class="textarea" name="" id="" cols="10" rows="5" v-model="contactDetailsContent" ></textarea>
        <button @click.prevent="changeUsefulNote">change contact</button>
    </div>
</template>

<script setup>
import {onMounted, ref, watch} from 'vue';
import { useCounterStore } from '../../stores/counter';
import {useToast} from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-sugar.css';
const $toast = useToast();
const props = defineProps({
    email:String,
    content: String
})
const store = useCounterStore()
const url = import.meta.env.VITE_BASE_URL
const contactDetailsContent = ref("")
function formatDate(){
    const date = new Date();
    const year = date.getFullYear();
    const month = `0${date.getMonth() + 1}`.slice(-2);
    const day = `0${date.getDate()}`.slice(-2);
    const formattedDate = `${year}-${month}-${day}`;
    return formattedDate
}


async function changeUsefulNote(){
    if(contactDetailsContent.value == "") {
        $toast.open({message:"please fill the field", type:"error", position:"top"})
        return
    }
    const body = {
        content:contactDetailsContent.value,
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

watch(() => props.content, value => {
    contactDetailsContent.value = value
});

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

.contact-details > textarea{
    resize: none;
    min-height: 16px;

}
</style>