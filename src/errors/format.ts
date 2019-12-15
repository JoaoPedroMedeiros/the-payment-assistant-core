import errors = require('./index')
import validator = require('express-validator')

class RequestFormatError extends Error {

    validationResult: validator.Result<validator.ValidationError>

    constructor(validationResult: validator.Result<validator.ValidationError> | any) {
        super('The request has a invalid format')
        this.validationResult = validationResult
    }

    static throwIfInvalid(request) {
        const errors = validator.validationResult(request)
        if (!errors.isEmpty()) {
            throw new RequestFormatError(errors)
        }
    }

    static nextForInvalidRequest(request, next) {
        const errors = validator.validationResult(request)
        if (!errors.isEmpty()) {
            const e = new RequestFormatError(errors)
            throw e
        }
    }
}

export = RequestFormatError
