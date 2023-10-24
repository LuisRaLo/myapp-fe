import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import { initializeApp } from 'firebase/app'

const firebaseConfig = {
  apiKey: 'AIzaSyB74QEZMEGJeVdz7BemU9JO0vQsakavM7c',
  authDomain: 'myapp-e5cbe.firebaseapp.com',
  projectId: 'myapp-e5cbe',
  storageBucket: 'myapp-e5cbe.appspot.com',
  messagingSenderId: '327821887779',
  appId: '1:327821887779:web:ead0060d9681901ec52496',
  measurementId: 'G-HK93QBFTC7'
}

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig)

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
