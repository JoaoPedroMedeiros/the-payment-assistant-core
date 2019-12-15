import BusinessError = require('../errors/business')
import RequestFormatError = require('../errors/format')
import firebase = require('firebase')

export = (error, request, response, next) => {
    if (error instanceof BusinessError) {
        response.status(412).send({ code: error.code, message: error.message })
        console.error(error)
    } else if (error instanceof RequestFormatError) {
        response.status(400).send(error.validationResult.array())
    } else if (error.code) {
        response.status(412).send({ code: error.code, message: error.message})
        console.log(error)
    } else {
        response.status(500).send(error)
        console.error(error)
    }
}