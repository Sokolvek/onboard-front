<script setup>
import {onMounted, ref} from 'vue';
import Navigation from './components/Navigation.vue';
import {useCounterStore} from './stores/counter';
import {useRouter, useRoute} from 'vue-router';
import BackHome from "./components/BackHome.vue"
import NewNav from './components/NewNav.vue';
import ReportPopup from './components/ReportPopup.vue';
import { watch } from 'vue';
const store = useCounterStore()
const router = useRouter()
const route = useRoute()

onMounted(() => {
  if (store.getCookieJwt() == null) {
    router.push("/")
  } else {
    store.jwt = store.getCookieJwt()[1]
  }
  function checkOnRoutes(){
    if(route.path.split("/")[1] == "admin"){
      console.log("admin")
    }
    console.log(route.path)
  }
  // checkOnRoutes()
})
</script>

<template>
  <div>
    <ReportPopup />
    <Navigation/>
    <router-view v-slot="{ Component }">
      <transition name="fade" mode="out-in">
        <component :is="Component"/>
      </transition>
    </router-view>
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: all .5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
