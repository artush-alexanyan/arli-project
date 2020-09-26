import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/store.js'
import axios from 'axios'
import firebase from 'firebase'
import { BootstrapVue } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

const firebaseConfig = {
  apiKey: "AIzaSyBbBW4SATJLCQWpnRyfncHlPMtHUTPxBdI",
  authDomain: "arli-project.firebaseapp.com",
  databaseURL: "https://arli-project.firebaseio.com",
  projectId: "arli-project",
  storageBucket: "arli-project.appspot.com",
  messagingSenderId: "773157600644",
  appId: "1:773157600644:web:fad52f2a478cdff56071d1"
}
// Initialize Firebase
firebase.initializeApp(firebaseConfig)

axios.defaults.baseURL = process.env.BASE_URL
export default axios;

// Install BootstrapVue
Vue.use(BootstrapVue)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
