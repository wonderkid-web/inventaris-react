// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

// INVENTARIS
// const firebaseConfig = {
//     apiKey: "AIzaSyA-syOyENqSGAQ61aURZ7C6iLuuMelSKdQ",
//     authDomain: "inventaris-3098b.firebaseapp.com",
//     projectId: "inventaris-3098b",
//     storageBucket: "inventaris-3098b.appspot.com",
//     messagingSenderId: "553118789516",
//     appId: "1:553118789516:web:7da40cd28876a00156f0a9",
//     measurementId: "G-BQBNPV9R1L"
// };

// MAHASISWA
const firebaseConfig = {
    apiKey: "AIzaSyC3iC-jfWq1iqMk87nmcTzDbqgSo6x7am4",
    authDomain: "realtime-chart-b6bae.firebaseapp.com",
    projectId: "realtime-chart-b6bae",
    storageBucket: "realtime-chart-b6bae.appspot.com",
    messagingSenderId: "414230031850",
    appId: "1:414230031850:web:91409bff4db22fc9195693"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
