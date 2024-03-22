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
          <header class="card-header">
            <h3>{{ note.header }}</h3>
            <img
              @click="gotoPage(note.id)"
              src="../assets/imgs/three-dots.svg"
              alt=""
              class="three-dots"
            />
            </header>
            <div class="note-right" v-if="note.content">
            <p class="note-desc" v-for="(content,i) in note.content.split('\n')" :key="i">
              <img src="../assets/imgs/dot-icon.svg" alt="">
            {{ content }}
            </p>
          </div>
        <footer class="note-date">
          <p>Created</p>
          <p class="note-text">{{ note.date }}</p>
        </footer>
          
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
const notesContent = ref([])
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
      // notesContent.value = data.meetingNotes.content.split("\n")
      console.log(data.meetingNotes[8].content.split("\n"))
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
  flex-wrap: wrap;
  gap: 20px;
  margin-top: 40px;
}

li {
    transition: 0.5s;
  display: flex;
  flex-direction: column;
  width: 30%;
  min-height: 200px;
  position: relative;
  animation: appear 1.5s;
  border-radius: 15px;
  border-bottom-left-radius: 0;
  border-bottom-left-radius: 12px;
  border-bottom-right-radius: 12px;
  border: 1px solid #0d6efd;
}

.aside {
  display: flex;
  flex-direction: column;
  border-right: 1px solid #0d6efd;
}

.aside > h3 {
  padding: 15px;
}

.note-date {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  display: flex;
  justify-content: space-between;

  background: #0d6efd;
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
}



.note-date > p {
    padding: 10px;
  color: white;
}

.card-header{
    border-bottom: 1px solid #0d6efd;
}

h2,
h3 {
  color: #0d6efd;
}

li > header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 10px;

}

li:hover{
}

.note-text {
  color: #0d6efd;
}

.note-right {
  padding: 15px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  height: 100%;
overflow: hidden;
}

.note-right > p{
  color: #0d6efd;
}

.note-right > img {
  width: 30px;
  transform: translateY(-40px);
  cursor: pointer;
}

.three-dots{
  width: 40px;
  cursor: pointer;
}

.note-desc{
  display: flex;
  gap: 10px;
  align-items: center;
}

@keyframes appear {
    0%{
        opacity: 0;
    }

    100%{
        opacity: 1;
    }
}
</style>
