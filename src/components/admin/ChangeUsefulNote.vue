<template>
    <header>
        <h2>Add useful note</h2>
    </header>
    <div class="useful-notes">
        <textarea required class="textarea" name="" id="" cols="10" rows="5" v-model="usefulNoteContent"></textarea>
        <button @click.prevent="changeUsefulNote">save</button>
    </div>
</template>

<script setup>
import {onMounted, onUpdated, ref, toRefs, watch} from 'vue';
import {useCounterStore} from '../../stores/counter';
import {useToast} from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-sugar.css';

const props = defineProps({
    email: String,
    content: String
})

const $toast = useToast();
const store = useCounterStore()
const url = import.meta.env.VITE_BASE_URL
const usefulNoteContent = ref("")


function formatDate() {
    const date = new Date();
    const year = date.getFullYear();
    const month = `0${date.getMonth() + 1}`.slice(-2);
    const day = `0${date.getDate()}`.slice(-2);
    const formattedDate = `${year}-${month}-${day}`;
    return formatDate
}

async function changeUsefulNote() {
    if (usefulNoteContent.value == "") {
        $toast.open({message: "please fill the field", type: "error", position: "top"})
        return
    }
    const body = {
        content: usefulNoteContent.value,
        date: formatDate()
    }
    await fetch(`${url}/note/useful-info/${props.email}`, {
        method: "PUT",
        headers: {
            "Authorization": "Bearer " + store.jwt
        },
        body: JSON.stringify(body)
    }).then((response) => {
        if (response.status == 200) {
            $toast.open({message: "success", type: "success", position: "top"})
        } else {
            $toast.open({message: "error caused", type: "error", position: "top"})
        }
        return response
    })
}


onMounted(() => {
    formatDate()
})

watch(() => props.content, value => {
    usefulNoteContent.value = value
});
</script>


<style scoped>

.useful-notes {
    display: flex;
    flex-direction: column;
    gap: 20px;
}

.useful-notes > button {
    width: fit-content;
}

.useful-notes > textarea {
    resize: none;
    min-height: 16px;

}
</style>
