import { useRouter } from "vue-router";
import { useCounterStore } from "../stores/counter";
export default function isLoggedIn({ next, to }){
    const store = useCounterStore()
    const router = useRouter()
    if(store.getCookieJwt() == null){
      router.push("/login")
    }
    
}