import { initializeApp } from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyBXRjQb0CwB58-NjAu2bbtXErhLyqwspXk",
    authDomain: "wearit-4750f.firebaseapp.com",
    projectId: "wearit-4750f",
    storageBucket: "wearit-4750f.appspot.com",
    messagingSenderId: "1001626090138",
    appId: "1:1001626090138:web:47ce68256cc81a0906fd23",
    measurementId: "G-F766KMDTED"
};

export const app = initializeApp(firebaseConfig);