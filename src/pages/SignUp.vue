<template>
  <div>
    <Header />
    <section>
      <h2>Registration</h2>
      <form action="">
          <div class="form-input">
              <!-- <label>Email address</label> -->
              <input v-model="formValue.email" type="email" placeholder="Name" required>
          </div>
          <div class="form-input">
              <!-- <label>Email address</label> -->
              <input v-model="formValue.name" type="text" placeholder="Login" required>
          </div>
          <div class="form-input">
              <!-- <label  >Password</label> -->
              <input v-model="formValue.password" type="password" placeholder="Password" required>
          </div>
          <!-- <div>
              <input v-model="rememberMe" type="checkbox">
              <label>Remember me</label>
          </div> -->
          <button @click.prevent="regUser">Register</button>
      </form>
      <!-- <Transition>
          <AuthNotify :class="popUpClass" v-if="notifyState == true">{{ popUpText }}</AuthNotify>
      </Transition> -->
  </section>
  </div>
</template>

<script setup>
import { onMounted, reactive, ref } from 'vue';
import AuthNotify from "../components/AuthNotify.vue"
import Header from '../components/Header.vue';
import {useToast} from 'vue-toast-notification';
const $toast = useToast();
import 'vue-toast-notification/dist/theme-sugar.css';

const formValue = reactive({
  email:"",
  name:"",
  password:""
})
const popUpText = ref("")
const popUpClass = ref("none")
const status = ref(false)
const notifyState = ref(false)
const url = import.meta.env.VITE_BASE_URL

function dissapearPopup(){
    setTimeout(() => notifyState.value = false, 4000)
}


function userExists(){
    popUpClass.value = "error"
    popUpText.value = " User with such email already exists"
    $toast.open({message:popUpText.value, type:popUpClass.value, position:"top"})
}

function successLogin(){
    
    popUpClass.value = "success"
    popUpText.value = "success signed in"
    $toast.open({message:popUpText.value, type:popUpClass.value, position:"top"})
    return popUpText.value
}



async function regUser(){


  const response = await fetch(`${url}/auth/register`,
  {
    method:"POST",
    body:JSON.stringify({
      "email":formValue.email,
      "password":formValue.password,
      "fullName":formValue.name
    }),
    headers:{
      "Content-Type":"application/json"
    }
  })
  .then((response) => {
        if(response.status === 409){
          userExists()
        }else if(response.status === 200){
          successLogin()
          setTimeout(() => router.push("/login"),500)
        }
        return response.json()
  }).then((data) =>{
    localStorage.setItem("email", formValue.email)
    console.log("Data1". data)
  })

}



onMounted(() =>{
})
</script>

<style scoped>

.test{
  color: red;
}
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}

h2{
  font-size: 32px;
    color: #0d6efd;
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
    margin: 0 auto;
    padding: 0.375rem 1.075rem;
    border: none;
    border-radius: 3px;
    width: 100%;
    color: white;
    background-color: #0d6efd;
    font-size: 18px;
    cursor: pointer;
}
</style>
