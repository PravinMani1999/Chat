import React from 'react';
import * as firebase from 'firebase';
import 'firebase/firestore';

 var firebaseConfig = {
    apiKey: "AIzaSyCyA164DlKuhkuoD3PKKlqMmcjkZg64WnA",
    authDomain: "fullchat-f3650.firebaseapp.com",
    databaseURL: "https://fullchat-f3650.firebaseio.com",
    projectId: "fullchat-f3650",
    storageBucket: "fullchat-f3650.appspot.com",
    messagingSenderId: "883057028700",
    appId: "1:883057028700:web:b9a902440ab8a16e4e8099",
    measurementId: "G-4Q1PCD8X4W"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();

  export default firebase;