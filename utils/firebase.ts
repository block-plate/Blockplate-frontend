import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
    apiKey: "AIzaSyAlicwAvw1Q5YoFNtgh3FlhpYlBsJQfU5I",
    authDomain: "blockplate-41fec.firebaseapp.com",
    projectId: "blockplate-41fec",
    storageBucket: "blockplate-41fec.appspot.com",
    messagingSenderId: "182673169370",
    appId: "1:182673169370:web:bed0008787be9df4793ee3"
};

export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app)