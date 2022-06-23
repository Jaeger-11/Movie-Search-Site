// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {getFirestore} from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyD69AK5VMa5jxyQruJTMiHllwfq2HgHVPU",
  authDomain: "movie-site-77199.firebaseapp.com",
  projectId: "movie-site-77199",
  storageBucket: "movie-site-77199.appspot.com",
  messagingSenderId: "827556012403",
  appId: "1:827556012403:web:55aa4666a0304e78346506",
  measurementId: "G-F36D1TLSYB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const projectStorage = getStorage();
const projectFirestore = getFirestore();

export {projectFirestore, projectStorage, auth} 