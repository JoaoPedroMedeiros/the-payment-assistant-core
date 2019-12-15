import errors = require('./index')

class BusinessError extends Error {

    code: number

    constructor(businessCode: errors.BusinessCode) {
        super(businessCode.message)
        this.code = businessCode.code
    }
}

export = BusinessError
