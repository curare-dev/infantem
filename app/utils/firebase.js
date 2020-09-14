import firebase from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyAj4PXtWOuT1-Mh7gW9XU5CFsxUSpJZjXc",
  authDomain: "tenedores-95d36.firebaseapp.com",
  databaseURL: "https://tenedores-95d36.firebaseio.com",
  projectId: "tenedores-95d36",
  storageBucket: "tenedores-95d36.appspot.com",
  messagingSenderId: "957787564155",
  appId: "1:957787564155:web:2e941cdc448b15c75c9ade",
};

export const firebaseApp = firebase.initializeApp(firebaseConfig);
