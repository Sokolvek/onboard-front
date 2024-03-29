<template>
  <div>
    <NewNav />
    <section class="container">
      <header class="header">
        <div class="header-title">
          <img src="../assets/imgs/paid-icon.svg" alt="" />
          <div>
            <h2>Betaalde reclame rapporten</h2>
            <p>
                Hier is een overzicht van de resultaten die tot nu toe zijn behaald met de advertenties voor uw bedrijf.
            </p>
          </div>
        </div>
        <!-- <button @click="downloadAllMedia">
          <img src="../assets/imgs/download-icon.svg" alt="">
          download all reports</button> -->
      </header>
      <ul class="imgs-list">
        <li class="imgs-item" v-for="(report, i) in images.reports" :key="i">
  
          <div class="report-wrapper">
            <div>
              <ReportsSlider :imgs="report.imageUrls"/>
              
            </div>
            <div class="report-middle">
              <p class="report-name">
                  {{ report.reportData.name }}
              <!-- {{ image.imageUrls[5].split("/")[image.imageUrls[5].split("/").length - 1] }} -->
            </p>
              <button @click="downloadReport(report.reportId)" class="download-report">
                   <img src="../assets/imgs/download-icon.svg" alt="">
                   Rapport downloaden
              </button>
            </div>
            <footer>
              <div>
                  <p>Totaal gewicht Kb</p>
                  <span>{{ report.sizeKb }}</span>
              </div>
              <div>
                  <p>Gemaakt</p>
                  <span>{{ report.reportData.date }}</span>
              </div>
            </footer>
          
          </div>
        </li>

      
      </ul>

      <!-- <BackHome /> -->
    </section>
  </div>
</template>

<script setup>
import NewNav from "../components/NewNav.vue";
import ReportsSlider from "../components/ReportsSlider.vue";
import { onMounted, ref } from "vue";
import { useCounterStore } from "../stores/counter";
import NavBar from "../components/NavBar.vue";
import { useToast } from "vue-toast-notification";
import BackHome from "../components/BackHome.vue";
const $toast = useToast();
let canDownload = true;
const images = ref({});
const store = useCounterStore();
const url = import.meta.env.VITE_BASE_URL;


async function downloadReport(reportId) {
  await fetch(`${url}/report/zipped/${localStorage.getItem("email")}/${reportId}`,
  {
    method:"GET",
    headers:{
      Authorization: "Bearer " + store.jwt
    }
  }).then((response) => {
    if (response.status == 200) {
        $toast.open({ message: "success", type: "success", position: "top" });
      } else {
        $toast.open({
          message: "error caused",
          type: "error",
          position: "top",
        });
        canDownload = false;
      }
      return response.blob();
  })
  .then((blob) =>{
    if(!canDownload) return
    const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "report.zip";
      document.body.appendChild(a);
      a.click();
      a.remove();
      canDownload = true
  })
} 

async function getImages() {
  await fetch(
    `${url}/report/${localStorage.getItem("email")}`,
    {
      method: "GET",
      mode:"cors",
      headers: {
        Authorization: "Bearer " + store.jwt,
      },
    }
  )
    .then((response) => response.json())
    .then((data) => {
      console.log(data.reports);
      images.value = data;
    });
}

async function downloadAllMedia() {
  await fetch(
    `${url}/image/paid-advertising-reports/zipped/${localStorage.getItem(
      "email"
    )}`,
    {
      method: "GET",
      headers: {
        Authorization: "Bearer " + store.jwt,
      },
    }
  )
    .then((response) => {
      if (response.status == 200) {
        $toast.open({ message: "success", type: "success", position: "top" });
      } else {
        $toast.open({
          message: "error caused",
          type: "error",
          position: "top",
        });
        canDownload = false;
      }
      return response.blob();
    })
    .then((blob) => {
      if (!canDownload) return;
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "reports.zip";
      document.body.appendChild(a);
      a.click();
      a.remove();
    });
}

onMounted(() => {
  getImages();
});
</script>

<style scoped>
section {
  margin-top: 100px;
}

.header {
  display: flex;
  gap: 20px;
  justify-content: space-between;
  align-items: center;
}

.header-title {
  display: flex;
  gap: 20px;
}

.header-title > img {
  width: 60px;
}

.header-title > div > h2 {
  color: #0d6efd;
  font-size: 50px;
}

.header-title > div > h2 {
  color: #0d6efd;
}

.imgs-list{
  margin-top: 100px;
}

.imgs-item {
  
  display: flex;
  flex-wrap: wrap;
  gap: 40px;
}

.report-wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 20px;
  border-radius: 6px;
}

.report-middle{
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  height: 98%;
  border-top: 2px solid #0d6efd;
  border-bottom: 2px solid #0d6efd;
}

.report-wrapper > img {
  max-width: 100px;
  max-height: 50px;
}

.report-wrapper > div {
  display: flex;
  align-items: center;
  gap: 20px;
  cursor: pointer;
}

.img-wrapper > div > p {
  color: #0d6efd;
  text-decoration: none;
}

.img-wrapper > div > button {
  background: #0d6efd;
  border: none;
  padding: 10px 5px;
  border-radius: 6px;
}

.img-wrapper > div > button > a {
  color: white;
  text-decoration: none;
}

footer{
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  width: 50%;
  height: 98%;
  border: 2px solid #0d6efd;
  border-left: none;
  border-bottom-right-radius: 8px;
  border-top-right-radius: 8px;
  /* padding-bottom: 20px; */
}

footer > div{
  display: flex;
  justify-content: space-between;
  padding-right: 20px;
  margin-bottom: 20px;
}

footer > div > p,span{
  color: #3873E9;
}

.report-name{
  font-size: 20px;
  color: #3873E9;
  align-self: baseline;
  margin-left: 20px;
}

.download-report{
  width: 90%;
  justify-content: center;
  padding: 10px;
}

button {
  display: flex;
  cursor: pointer;
  align-items: center;
  gap: 10px;
  padding: 0.375rem 0.75rem;
  border: none;
  border-radius: 3px;
  color: white;
  background-color: #3873E9;
  font-size: 18px;
}
</style>
