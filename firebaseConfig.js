// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAXgMIIrfGRZBvMyQLwRTa5BEW50EY7ujg",
  authDomain: "techgranassist.firebaseapp.com",
  projectId: "techgranassist",
  storageBucket: "techgranassist.appspot.com",
  messagingSenderId: "728851497845",
  appId: "1:728851497845:web:0839d20bfb0423f16cc93c",
  measurementId: "G-CL4Y9HDGKL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Servicios de Firebase
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app)

 export {auth,db,storage}