import admin = require('firebase-admin')

admin.initializeApp({
    credential: admin.credential.applicationDefault(),
    storageBucket: "the-payment-assistent.appspot.com"
});

export = admin.storage().bucket()
