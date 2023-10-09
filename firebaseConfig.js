import { initializeApp } from 'firebase/app';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Optionally import the services that you want to use
// import {...} from "firebase/auth";
// import {...} from "firebase/database";
// import {...} from "firebase/firestore";
// import {...} from "firebase/functions";
// import {...} from "firebase/storage";

// Initialize Firebase

const firebaseConfig = {
  apiKey: 'AIzaSyBnYk_i7HmsBsBEgNX0Bsjg7VC25w_cGXw',
  authDomain: 'nutrifit-29526.firebaseapp.com',
  databaseURL: 'https://nutrifit-29526.firebaseio.com',
  projectId: 'nutrifit-29526',
  storageBucket: 'nutrifit-29526.appspot.com',
  messagingSenderId: 'sender-id',
  appId: '1:337410191828:android:78054b4d777dce4c602641',
  measurementId: 'G-measurement-id',
}; 

const app = initializeApp(firebaseConfig);


// const auth = initializeAuth(app,{
//     persistence: getReactNativePersistence(ReactNativeAsyncStorage),
//   });

export {app};

export const storage = getStorage(app);
export const db = getFirestore(app);