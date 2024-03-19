import { defineStore } from "pinia";



export const useCounterStore = defineStore("counter", {
  state: () => ({
    sum: 0,
    navPopup:false,
    jwt:null
  }),
  getters: {

  },
  actions: {
    setCookie(jwtToken){
      const expiresIn = new Date();
      expiresIn.setHours(expiresIn.getHours() + 24);
      document.cookie = `token=${jwtToken}; Secure; HttpOnly; SameSite=Lax; expires=${expiresIn.toUTCString()}`;
    },
    getCookieJwt(){
      let pattern = RegExp("token" + "=.[^;]*");
      let matched = document.cookie.match(pattern);
      if(matched){
          let cookie = matched[0].split('=');
          return cookie
      }
      return null
    }
  },
});
