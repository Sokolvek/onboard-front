<template>
  <div>
    <NewNav />
    <section class="container">
      <header class="header">
        <div class="header-title">
          <img src="../assets/imgs/meeting-icon.svg" alt="" />
          <div>
            <h2>Meeting notes</h2>
            <p>Notes from previous meetings. New appointments.</p>
          </div>
        </div>
        <!-- <NavBar /> -->
      </header>
      <transition-group name="fade" tag="ul" v-show="notes.meetingNotes">
        <li v-for="(note, i) in notes.meetingNotes" :key="i" class="fade-item">
          <aside class="aside">
            <h3>{{ note.header }}</h3>
            <div class="note-date">
              <p>Created at</p>
              <p class="note-text">{{ note.date }}</p>
            </div>
          </aside>
          <div class="note-right">
            <p class="note-text">{{ note.content }}</p>
            <img
              @click="gotoPage(note.id)"
              src="../assets/imgs/three-dots.svg"
              alt=""
            />
          </div>
        </li>
      </transition-group>

      <!-- {{ notes }} -->
      <!-- <BackHome /> -->
      <!-- <Toast /> -->
    </section>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useCounterStore } from "../stores/counter";
import NavBar from "../components/NavBar.vue";
import NewNav from "../components/NewNav.vue";
import BackHome from "../components/BackHome.vue";
const url = import.meta.env.VITE_BASE_URL;
import { useRouter } from "vue-router";
const notes = ref({});
const store = useCounterStore();
const router = useRouter();
import { useToast } from "vue-toast-notification";
import "vue-toast-notification/dist/theme-sugar.css";

const $toast = useToast();

function gotoPage(id) {
  router.push(
    `/meeting-notes/meeting-note-page/${localStorage.getItem("email")}/${id}`
  );
}

async function getNotes() {
  await fetch(`${url}/note/meeting-notes/${localStorage.getItem("email")}`, {
    method: "GET",
    headers: {
      Authorization: "Bearer " + store.jwt,
    },
  })
    .then((response) => {
      console.log(response);
      return response.json();
    })
    .then((data) => {
      console.log(data);
      notes.value = data;
    });
}

onMounted(() => {
  getNotes();
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
  width: 50px;
}

.header-title > div > h2 {
  color: #0d6efd;
  font-size: 50px;
}

ul {
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-top: 40px;
}

li {
    transition: 0.5s;
  display: flex;
  width: 100%;
    animation: appear 1.5s;
  border-radius: 15px;
  border-bottom-left-radius: 0;
  min-height: 130px;
  max-height: 130px;
  border: 1px solid #0d6efd;
}

.aside {
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  width: 30%;
  border-right: 1px solid #0d6efd;
}

.aside > h3 {
  padding: 15px;
}

.note-date {
  padding: 15px;
  background: #0d6efd;
}

.note-date > p {
  color: white;
}

h2,
h3 {
  color: #0d6efd;
}

li > header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}

li:hover{
    transform: translateX(50px);
}

.note-text {
  color: #0d6efd;
}

.note-right {
  width: 70%;
  display: flex;
  justify-content: space-between;
  padding: 15px;
}

.note-right > p {
  width: 90%;
}

.note-right > img {
  width: 50px;
  transform: translateY(-40px);
  cursor: pointer;
}

@keyframes appear {
    0%{
        transform: translateX(50px);
        opacity: 0;
    }

    100%{
        transform: translateX(0px);
        opacity: 1;
    }
}
</style>
