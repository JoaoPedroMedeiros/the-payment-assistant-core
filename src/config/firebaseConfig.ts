import firebase = require('firebase/app')

require('firebase/firestore')
require('firebase/storage')

const config = {
    apiKey: "AIzaSyALAJZTK-BnB_BrsrLluh-cmLC3iYsVbGQ",
    authDomain: "the-payment-assistent.firebaseapp.com",
    databaseURL: "https://the-payment-assistent.firebaseio.com",
    projectId: "the-payment-assistent",
    storageBucket: "the-payment-assistent.appspot.com",
    messagingSenderId: "821160551070",
    appId: "1:821160551070:web:06f6cefd5f7339708a918f"
}

export = firebase.initializeApp(config)
