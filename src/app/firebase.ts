import { initializeApp, getApps, getApp } from "firebase/app";
import { getDatabase, ref, get, child } from "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyDLrpLTvmqdthZlDs6B9GvK6RtxFfV3GyU",
    authDomain: "project-a2-7b9e8.firebaseapp.com",
    databaseURL: "https://project-a2-7b9e8-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "project-a2-7b9e8",
    storageBucket: "project-a2-7b9e8.firebasestorage.app",
    messagingSenderId: "423221934609",
    appId: "1:423221934609:web:126218f73b12c959f08fb0",
    measurementId: "G-PLSVLXGESZ"
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const db = getDatabase(app);

export { db };