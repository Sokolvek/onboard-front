<template>
    <section class="container">
        <header class="header">
            <div class="header-title">
                <img src="../assets/imgs/paid-icon.svg" alt="">
                <div>
                    <h2>Paid Advertisement Reports</h2>
                    <p>Reports from the company to illustrate the impact of our cooperation.</p>
                </div>
            </div>
            <NavBar />
        </header>
        <div class="imgs-list" v-for="(image,i) in images.imageUrls" :key="i">
            <div class="img-wrapper">
                <div>
                    <p>
                {{ image.split("/")[image.split("/").length-1] }}
            </p>
            <button>
                <a :href="image" :download="image[0].split('/')[image[0].split('/').length-1]">
                download
            </a>
            </button>
                </div>
                <img :src="image" alt="">

            </div>
        </div>
       
        <BackHome />
    </section>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useCounterStore } from '../stores/counter';
import NavBar from '../components/NavBar.vue';
import BackHome from "../components/BackHome.vue"

const images = ref({})
const store = useCounterStore()
const url = import.meta.env.VITE_BASE_URL

async function getImages(){
    await fetch(`${url}/image/paid-advertising-reports/${localStorage.getItem("email")}`,
    {
        method:"GET",
        headers:{
            "Authorization":"Bearer " + store.jwt
        },
    }).then((response) => response.json())
    .then((data) => {
        console.log(data)
        images.value = data})
}

onMounted(() => {
    getImages()
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
    width: 60px;
}

.header-title > div > h2{
    color: #0d6efd;
    font-size: 50px;
}

.header-title > div > h2{
    color: #0d6efd;
}

.imgs-list{
    margin-top: 100px;
    display: flex;
    flex-wrap: wrap;
    gap: 40px;
}

.img-wrapper{
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    padding: 20px;
    border-radius: 6px;
}

.img-wrapper >img{
    max-width: 100px;
    max-height: 50px;
}

.img-wrapper > div{
    display: flex;
    align-items: center;
    gap: 20px;
}

.img-wrapper > div > p{
    color: #0d6efd;
    text-decoration: none;
}

.img-wrapper > div > button{
    background: #0d6efd;
    border: none;
    padding: 10px 5px;
    border-radius: 6px;
}

.img-wrapper > div > button > a{
    color: white;
    text-decoration: none;
}

</style>