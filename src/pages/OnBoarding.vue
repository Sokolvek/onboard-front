<template>
  <div>

    <NewNav/>
    <section class="container">
      <header class="header">
        <div class="header-title">
          <img src="../assets/imgs/quiz.svg" alt="" />
          <div>
            <h2>Inwerken</h2>
            <p>Beantwoord de vragen, zodat wij een nauwkeurig beeld hebben van de aanpak die we moeten volgen.</p>
          </div>
        </div>
        <!-- <NavBar /> -->
      </header>
      <form action="">
        <div class="input">
          <label for=""
            >1. In zoveel mogelijk detail, beschrijf jouw ideale klant.
          </label>
          <textarea
          :placeholder="answers[0] || 'antwoord hier'"
            v-model="state.qus1"
            required
          ></textarea>
        </div>
        <div class="input">
          <label for=""
            >2. Zjin er bepaadle sectoren waarin jullie ideale klant vaak te
            vinden is? Waarom past jullie aanbod goed bij hun behoeften?</label
          >
          <textarea
          :placeholder="answers[1] || 'antwoord hier'"
            v-model="state.qus2"
            required
          ></textarea>
        </div>
        <div class="input">
          <label for=""
            >3. Waarom maken uw klanten gebruik van uw dienst? Welke problemen lost het voor hen op?</label
          >
          <textarea
          :placeholder="answers[2] || 'antwoord hier'"
            v-model="state.qus3"
            required
          ></textarea>
        </div>
        <div class="input">
          <label for=""
            >4. Geef alsjeblieft een lijst van enkele van jouw meest significante
              concurrenten.</label
          >
          <textarea
          :placeholder="answers[3] || 'antwoord hier'"
            v-model="state.qus4"
            required
          ></textarea>
        </div>
        <div class="input">
          <label for=""
            >5. Waarom kiezen klanten voor uw bedrijf in plaats van de concurrent?</label
          >
          <textarea
     
            v-model="state.qus5"
            :placeholder="answers[4] || 'antwoord hier'"
            required
          ></textarea>
        </div>
        <div class="input">
          <label for=""
            >6. Heeft u eerder gebruik gemaakt van diensten van marketingbedrijven?
              Zo ja, welke aspecten van die ervaring waren voor u het meest waardevol, en waar zag u ruimte voor verbetering?</label
          >
          <textarea
          :placeholder="answers[5] || 'antwoord hier'"
            v-model="state.qus6"
            required
          ></textarea>
        </div>
        <button @click.prevent="sendForm" class="button">Verzenden</button>
      </form>
      <!-- <BackHome /> -->
    </section>
  </div>
</template>

<script setup>
import { onMounted, reactive, ref } from "vue";
import NavBar from "../components/NavBar.vue";
import { useCounterStore } from "../stores/counter";
import BackHome from "../components/BackHome.vue"
import NewNav from "../components/NewNav.vue";
import {useToast} from 'vue-toast-notification';
const store = useCounterStore()
const $toast = useToast();
const url = import.meta.env.VITE_BASE_URL
const state = reactive({
  qus1: "",
  qus2: "",
  qus3: "",
  qus4: "",
  qus5: "",
  qus6: "",
});
const answers = ref([])

async function sendForm(){
  if(!store.canBeClicked){
        return
    }
    store.canBeClicked = false
    setTimeout(() => store.canBeClicked = true, 3000)
    const stateArr = Object.values(state)
    const haveEmptyString = stateArr.some((value) => value === "")
    console.log("start")
    if(haveEmptyString){
      $toast.open({message:"vul alstublieft alle velden in", type:"error", position:"top"})
      return
    }
    const body = {
        // email:"bill_edwards@gmail.com",
        formAnswers:stateArr
    }
    console.log(body)
    await fetch(`${url}/client/${localStorage.getItem("email")}`,{
        method:"POST",
        mode:"cors",
        headers:{ 
                "Authorization":"Bearer " + store.jwt
            },
        body:JSON.stringify(body)
    }).then((response) => {
      if(response.status === 200){
        $toast.open({message:"success", type:"success", position:"top"})
      }else{
        $toast.open({message:"error", type:"error", position:"top"})
      }
    })
}

async function getAnswers(){
  await fetch(`${url}/client/get-data/${localStorage.getItem("email")}`,
  {
    method:"GET",
    headers:{ 
                "Authorization":"Bearer " + store.jwt
            },
          
  })
  .then((response) => response.json())
  .then((data) => {
    answers.value = data.formAnswers
    console.log(answers.value)
  })
}

onMounted(() => {
  getAnswers()
})
</script>

<style scoped>
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
section {
  margin-top: 100px;
  display: flex;
  flex-direction: column;
}

form {
  margin-top: 40px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}
.input {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.input > input {
  height: 40px;
}

textarea {
  resize: none;
}
.button {
  padding: 0.375rem 0.75rem;
  width: fit-content;
  border: none;
  border-radius: 3px;
  color: white;
  background-color: #0d6efd;
  font-size: 18px;
}
</style>
