import express = require('express')
import validator = require('express-validator')
import RequestFormatError = require('../errors/format')
import GroupFacade = require('../facade/groupsFacade')

const router = express.Router()

router.post('/groups', [
    validator.check('id').isString().notEmpty(),
    validator.check('description').isString().notEmpty()
], (request: express.Request, response: express.Response, next: express.NextFunction) => {
    RequestFormatError.nextForInvalidRequest(request, next)
    new GroupFacade()
        .createGroup(request.body.id, request.body.description)
        .then(group => response.json(group))
        .catch(next)
})

router.post('/{group_id}/closed', (request: express.Request, response: express.Response) => {
    
})

router.get('/', (request: express.Request, response: express.Response) => {

})

router.get('/{group_id}', (request: express.Request, response: express.Response) => {

})

export = router
