import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyB74QEZMEGJeVdz7BemU9JO0vQsakavM7c",
  authDomain: "myapp-e5cbe.firebaseapp.com",
  projectId: "myapp-e5cbe",
  storageBucket: "myapp-e5cbe.appspot.com",
  messagingSenderId: "327821887779",
  appId: "1:327821887779:web:ead0060d9681901ec52496",
  measurementId: "G-HK93QBFTC7",
  databaseURL: "https://myapp-e5cbe.firebaseio.com",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const analytics = getAnalytics(app);
const firestore = getFirestore(app);
const storage = getStorage(app);

export { auth, analytics, firestore, storage };

export default app;
