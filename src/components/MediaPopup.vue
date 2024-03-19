<template>
    <div class="popup">
        <div class="popup-inner">
            <header class="header">
                <h3>Upload File</h3>
                <!-- <p @click="emitFunction">close</p> -->
            </header>
            <label class="input-file">
	   	<!-- <span class="input-file-text" type="text"></span> -->
	   	<input type="file" @change="onFileChange">       
 	   	<span class="input-file-btn">Select File</span>
 	</label>
    <div v-if="images" class="img-preview">
        <!-- <img v-if="images.url[0]" :src="images.url[0]" alt="Image Preview" /> -->
        <!-- <img v-if="previewUrl" :src="images.url[1]" alt="Image Preview" /> -->
        <img v-if="previewUrl" :src="previewUrl" alt="Image Preview" />
    </div>
            
            <button class="input-file-btn" @click="loadImage">Load Image</button>
            
        </div>
        <div class="shadow"></div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useCounterStore } from '../stores/counter';
import {useToast} from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-sugar.css';
const $toast = useToast();
const emit = defineEmits(['closePopup']);
const store = useCounterStore()
const previewUrl = ref("")
const url = import.meta.env.VITE_BASE_URL
const images = ref([])
const file = ref()
const emitFunction = function() {
    emit('closePopup')
}
function onFileChange(e) {
    file.value = e.target.files[0];
    console.log(file.value)
    if (file) {
        // if(file.value === 0) return
        // for(let i = 0; i < file.value.length; i++){
        //     images.value.push({name: file.value[i].name, url:URL.createObjectURL(file.value[i])})
        // }
    const url = URL.createObjectURL(file.value);
    previewUrl.value = url;
 }
}
async function loadImage(){
    if(!file.value){
        $toast.open({message:"please put an image", type:"error", position:"top"})
        return
    }
    console.log(file.value)
    const formData = new FormData()
    formData.append("clientEmail", localStorage.getItem("email"))
    formData.append("files", file.value)
    await fetch(`${url}/image/media-assets/${localStorage.getItem("email")}`,
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
        console.log(response)
    })
}

</script>

<style scoped>

.popup{
    /* position: fixed; */
    top: 0;
    left: 0;
    /* height: 100svh; */
    width: 100%;
}

.popup-inner{
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    margin-top: 100px;
}

.header{
    display: flex;
}

.header > h3{
    color: #3873E9;
    font-size: 32px;
}

.img-preview{
    margin: 20px 0;
    border: 2px dashed black;
}

.input-file {
    margin-top: 20px;
	position: relative;
	display: inline-block;
}



.img-preview{
    display: flex;
    align-items: center;
    justify-content: center;
    width: 500px;
    height: 300px;
}

.img-preview > img{
    max-width: 100%;
    width: fit-content;
    height: fit-content;
}


.input-file-text {
	padding: 0 10px;
	line-height: 40px;
	text-align: left;
	height: 40px;
	display: block;
	float: left;
	box-sizing: border-box;
	width: 200px;
	border-radius: 6px 6px 6px 6px;
	border: 1px solid #ddd;
}
.input-file-btn {
    margin-top: 20px;
	display: inline-block;
	cursor: pointer;
	outline: none;
	font-size: 14px;
	vertical-align: middle;
	color: rgb(255 255 255);
	text-align: center;
	border-radius: 4px;
	background-color: #3873E9;
	line-height: 22px;
	height: 40px;
	padding: 10px 20px;
	box-sizing: border-box;
	border: none;
	margin: 0;
	transition: background-color 0.2s;
}
.input-file input[type=file] {
	position: absolute;
	z-index: -1;
	opacity: 0;
	display: block;
	width: 0;
	height: 0;
}
 
/* Focus */
.input-file input[type=file]:focus + .input-file-btn {
	box-shadow: 0 0 0 0.2rem rgba(0,123,255,.25);
}
 
/* Hover/active */
.input-file:hover .input-file-btn {
    background-color: #3873E9;
}
.input-file:active .input-file-btn {
    background-color: #3873E9;
}
 

</style>