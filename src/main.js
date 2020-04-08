import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import {
  BootstrapVue,
  IconsPlugin
} from 'bootstrap-vue'

Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import Vuelidate from 'vuelidate'
Vue.use(Vuelidate)


const firebase = require("firebase/app");

// Add additional services that you want to use
require("firebase/auth");
require("firebase/firestore");

const config = {
  apiKey: "AIzaSyBpn3qlTMIs5834e-OWxdjp1OFkwHVSBE8",
  authDomain: "crud-udemy-fa34f.firebaseapp.com",
  databaseURL: "https://crud-udemy-fa34f.firebaseio.com",
  projectId: "crud-udemy-fa34f",
  storageBucket: "crud-udemy-fa34f.appspot.com",
  messagingSenderId: "145619705575",
  appId: "1:145619705575:web:b531f7b79328c17c8e0c42"
};
// Initialize Firebase
const firebaseApp = firebase.initializeApp(config);

const auth = firebase.auth()
const db = firebaseApp.firestore()

export {
  auth,
  db
}

Vue.config.productionTip = false

firebase.auth().onAuthStateChanged((user) => {
  console.log(user);
  if (user) {
    store.dispatch('detectarUsuario', {
      email: user.email,
      uid: user.uid
    })
  } else {
    store.dispatch('detectarUsuario', null)
  }

  new Vue({
    router,
    store,
    render: h => h(App)
  }).$mount('#app')

})

