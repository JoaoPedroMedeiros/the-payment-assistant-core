import firebase = require('firebase/app')

require('firebase/firestore')
require('firebase/storage')

const config = {}

export = firebase.initializeApp(config)
