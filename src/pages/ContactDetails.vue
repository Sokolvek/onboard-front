<template>
    <section class="container">
        <header class="header">
            <div class="header-title">
                <img src="../assets/imgs/contact-icon.svg" alt="">
                <div>
                    <h2>Contact Details</h2>
                    <p>Detailed information about the contacts to help you keep in touch.</p>
                </div>
            </div>
            <NavBar />
        </header>
        <div class="tips" v-if="tips.content">
            <div class="tip" v-for="(contact,i) in tips.content" :key="i">
                <img src="../assets/imgs/dot-icon.svg" alt="">
                <span>{{ contact }}</span>
            </div>
           
        </div>
        <BackHome />
    </section>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useCounterStore } from "../stores/counter";
import NavBar from "../components/NavBar.vue";
import BackHome from "../components/BackHome.vue"

const store = useCounterStore()
const tips = ref({})
const url = import.meta.env.VITE_BASE_URL

async function getTips(){
    await fetch(`${url}/note/contact-details/${localStorage.getItem("email")}`,
    {
        method:"GET",
        headers:{ 
            "Authorization":"Bearer " + store.jwt
        },
    }).then((response) => response.json())
    .then((data) => {
        console.log(data)
        tips.value = data.contactDetails
    })
}

onMounted(() => {
    getTips()
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
    width: 50px;
}

.header-title > div > h2{
    color: #0d6efd;
    font-size: 50px;
}

.tips{
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-top: 40px;
}

.tip{
    display: flex;
    align-content: center;
    gap: 10px;
}

.tip > span{
    color: #575757;
}

.no-contacts{
    display: flex;
    justify-content: center;
    margin-top: 100px;

}
</style>