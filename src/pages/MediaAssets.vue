<template>
  <section class="container">
    <header class="header">
      <div class="header-title">
        <img src="../assets/imgs/media-assets-icon.svg" alt="" />
        <div>
          <h2>Media Assets</h2>
          <p>Upload images for advertisement from your local device.</p>
        </div>
      </div>
      <NavBar />
    </header>
    <ul>
      <li v-for="(image, i) in images" :key="i">
        {{ image }}
      </li>
    </ul>
    <MediaPopup @close-popup="popup = false" />
    <BackHome />
  </section>
</template>

<script setup>
import { useCounterStore } from "../stores/counter";
import MediaPopup from "../components/MediaPopup.vue";
import NavBar from "../components/NavBar.vue";
import { onMounted, ref } from "vue";
import BackHome from "../components/BackHome.vue";

const popup = ref(true);
const store = useCounterStore();
const images = ref();
const url = import.meta.env.VITE_BASE_URL;
async function getImages() {
  await fetch(`${url}/image/media-assets/${localStorage.getItem("email")}`, {
    method: "GET",
    headers: {
      Authorization: "Bearer " + store.jwt,
    },
  })
    .then((response) => {

        return response.json()
    })
    .then((data) => (images.value = data));
}

onMounted(() => {
  //   getImages()
});
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
    width: 70px;
}

.header-title > div > h2{
    color: #0d6efd;
    font-size: 50px;
}
.title {
  display: flex;
  justify-content: space-between;
  align-content: center;
  margin-top: 100px;
}

h2 {
  color: #0d6efd;
}
</style>
