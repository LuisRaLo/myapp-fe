import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyB74QEZMEGJeVdz7BemU9JO0vQsakavM7c",
  authDomain: "myapp-e5cbe.firebaseapp.com",
  projectId: "myapp-e5cbe",
  storageBucket: "myapp-e5cbe.appspot.com",
  messagingSenderId: "327821887779",
  appId: "1:327821887779:web:ead0060d9681901ec52496",
  measurementId: "G-HK93QBFTC7",
}

// init firebase
initializeApp(firebaseConfig)

// init & export firestore service
export const db = getFirestore()

// generate & export auth object
export const auth = getAuth()
