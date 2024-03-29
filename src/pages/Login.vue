<template>
    <div>
        <Header />

        <section>
            <!-- <Logo /> -->
            <div>
                <h2>Aanmelden</h2>
                <form action="">
                    <div class="form-input">
                        <input v-model="state.email" type="email" placeholder="E-mail of inloggen" required>
                    </div>
                    <div class="form-input">
                        <input v-model="state.password" type="password" placeholder="wachtwoord" required>
                    </div>
                    <!-- <div>
                        <input v-model="state.rememberMe" type="checkbox">
                        <label>Remember me</label>
                    </div> -->
                    <button @click.prevent="login">Inloggen</button>
                </form>
       
    
            </div>
        </section>
    </div>
</template>

<script setup>
import { useCounterStore } from "../stores/counter";
import {onMounted, reactive, ref} from "vue";
import { useRouter } from "vue-router";
import AuthNotify from "../components/AuthNotify.vue";
import Header from "../components/Header.vue";
import Logo from "../components/Logo.vue";
import {useToast} from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-sugar.css';
const $toast = useToast();
const store = useCounterStore()
const router = useRouter()
const state = reactive({
    email:"",
    password:"",
    rememberMe:false
})
const notifyState = ref(false)
const popUpText = ref("")
const popUpClass = ref("none")
const url = import.meta.env.VITE_BASE_URL

function wrongPassword(){
    popUpClass.value = "error"
    popUpText.value = "verkeerd wachtwoord of e-mail"

}

function wrongEmail(){
    popUpClass.value = "error"
    popUpText.value = "Gebruiker met dergelijk e-mailadres is niet gevonden"

}

function successLogin(){
    
    popUpClass.value = "success"
    popUpText.value = "succes aangemeld"

}



function getJwt(){
    const jwt = store.getCookieJwt();

}

const responseVariations = {
    200:successLogin(),
    401:wrongPassword(),
    404:wrongEmail()
}

async function login(){

    if(!state.email || !state.password){
        popUpClass.value = "error"
        $toast.open({message:"voer e-mail of login in", type:popUpClass.value, position:"top"})
        return
    }

    await fetch(`${url}/auth/sign-in`,
    {
        method:"POST",
        body:JSON.stringify({
            "email":state.email,
            "password":state.password
        })
    })
    .then((response) => {
        notifyState.value = true
        if(response.status === 200){
            successLogin()
            $toast.open({message:popUpText.value, type:popUpClass.value, position:"top"})
            
        }else{
            console.log("aaaa")
            wrongPassword()
            $toast.open({message:popUpText.value, type:popUpClass.value, position:"top"})
        }
        return response.json()
    })
    .then((data) => {
        localStorage.setItem("email", state.email)
    console.log("cookie saved")
    const expiresIn = new Date();
    expiresIn.setHours(expiresIn.getHours() + 24);
    document.cookie = `token=${data.jwt}; Secure; SameSite=Lax; expires=${expiresIn.toUTCString()}`;
    if(data.user.role == "MANAGER"){
        router.push("/admin")
        setTimeout(() => {
            router.go()
        }, 600)
        return
    }
      setTimeout(() =>{ router.go()}, 600)
      router.push("/")
    })

}



function putInLocalOrSession(){
    if(rememberMe.value){
        localStorage.setItem("isLoggedIn", "true")
        return
    }
    console.log("session")
    sessionStorage.setItem("isLoggedIn", "true")
    return
}

onMounted(() => {
})

</script>

<style scoped>

.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}

h2{
    color: #0d6efd;
    text-align: center;
}

.success{
    color: limegreen;
}
.error{
    color: red;
}
section{

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100svh;
}

form{
    position: relative;
    display: flex;
    flex-direction: column;
    width: 300px;
    gap: 10px;
}


form::before{
  content: "";
  position: absolute;
  top: -40%;
  left: -20%;
  background-image: url("../assets/imgs/decor-1.svg");
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  width: 40px;
  height: 40px;
}

form::after{
  content: "";
  position: absolute;
  bottom: 0%;
  right: -20%;
  background-image: url("../assets/imgs/decor-2.svg");
  background-position: center;
  background-size: contain;
  background-repeat: no-repeat;
  width: 52px;
  height: 95px;
}
.form-input{
    display: flex;
    flex-direction: column;
}

input{
    padding: 7px;
    border: none;
    border-bottom: 2px solid #0d6efd;
    background: none;
    
}
button{
    padding: 0.375rem 0.75rem;
    border: none;
    border-radius: 3px;
    color: white;
    background-color: #0d6efd;
    font-size: 18px;
}
</style>