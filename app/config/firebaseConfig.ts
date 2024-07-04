// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyA70Yl-Xf-ZvvHdQV317yZm8nz8qS_LU8M',
  authDomain: 'budzofboston-e47c7.firebaseapp.com',
  databaseURL: 'https://budzofboston-e47c7-default-rtdb.firebaseio.com',
  projectId: 'budzofboston-e47c7',
  storageBucket: 'budzofboston-e47c7.appspot.com',
  messagingSenderId: '127046953971',
  appId: '1:127046953971:web:83f302a87785c480870086',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export { app };
