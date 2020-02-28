import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import firebase from 'firebase'

// var firebase = require("firebase/app");

// Add additional services that you want to use
require("firebase/auth");
// require("firebase/database");
require("firebase/firestore");
// require("firebase/messaging");
// require("firebase/functions");



var firebaseConfig = {
  apiKey: "AIzaSyBpn3qlTMIs5834e-OWxdjp1OFkwHVSBE8",
  authDomain: "crud-udemy-fa34f.firebaseapp.com",
  databaseURL: "https://crud-udemy-fa34f.firebaseio.com",
  projectId: "crud-udemy-fa34f",
  storageBucket: "crud-udemy-fa34f.appspot.com",
  messagingSenderId: "145619705575",
  appId: "1:145619705575:web:b531f7b79328c17c8e0c42"
};
// Initialize Firebase
firebase.initializeApp(config);

Vue.config.productionTip = false

firebase.auth().onAuthStateChanged((user) => {
  console.log(user)
  if (user) {
    store.dispatch('detectarUsuario', {email: user.email, uid: user.uid})
  } else {
    store.dispatch('detectarUsuario', null)
  }

  new Vue({
    router,
    store,
    render: h => h(App)
  }).$mount('#app')

})

