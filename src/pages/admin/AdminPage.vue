<template>
    <section class="container">
        <header>
            <h2>Admin</h2>
            <ul>
                <li v-for="(user,i) in users.clients" :key="i">
                    <h3>{{ user.email }}</h3>
                    <button @click="router.push({path:`admin/client-page/${user.email}` })">go to user page</button>
                </li>
            </ul>
        </header>
    </section>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useCounterStore } from '../../stores/counter';

const router = useRouter()
const users = ref({})
const url = import.meta.env.VITE_BASE_URL
const store = useCounterStore()
async function getUsers(){
    await fetch(`${url}/client/list`,
    {
        method:"GET",
        headers:{ 
            "Authorization":"Bearer " + store.jwt
        },
    }).then((response) => response.json())
    .then((data) => users.value = data)
}

onMounted(() => {
    getUsers()
  
})
</script>

<style scoped></style>