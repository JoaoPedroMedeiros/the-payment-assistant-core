import express = require('express')

const router = express.Router()

router.post('/bill/pending', (request, response) => {
    response
        .status(200)
        .send('Bill Pending')
        .end();
})


router.post('/bill/paid', (request, response) => {
    response
        .status(200)
        .send('Bill Paid')
        .end();
})

router.post('/bill/group/opening', (request, response) => {
    response
        .status(200)
        .send('Opening')
        .end();
})

router.post('/bill/group/closing', (request, response) => {
    response
        .status(200)
        .send('Closing')
        .end();
})

export = router