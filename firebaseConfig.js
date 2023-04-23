// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
//https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAfc-pufhR0xoArMPZbZ-ZvWzSmbou0jQk",
  authDomain: "firstproject-16eb1.firebaseapp.com",
  databaseURL: "https://firstproject-16eb1-default-rtdb.firebaseio.com",
  projectId: "firstproject-16eb1",
  storageBucket: "firstproject-16eb1.appspot.com",
  messagingSenderId: "115927124161",
  appId: "1:115927124161:web:5958f2a7412d29602cac40",
  measurementId: "G-PSPCY1TP27",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// export const analytics = getAnalytics(app);
export const database = getFirestore(app);
