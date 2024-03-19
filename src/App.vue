<script setup>
import { onMounted } from 'vue';
import Navigation from './components/Navigation.vue';
import { useCounterStore } from './stores/counter';
import { useRouter } from 'vue-router'; 
import BackHome from "./components/BackHome.vue"

const store = useCounterStore()
const router = useRouter()
onMounted(() => {
  if(store.getCookieJwt() == null){
    router.push("/")
  }else{
    store.jwt = store.getCookieJwt()[1]
  }
})
</script>

<template>
  <div>
    <Navigation />
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
