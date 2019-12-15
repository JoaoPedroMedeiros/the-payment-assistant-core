import multer = require('multer')
import express = require('express')
import validator = require('express-validator')
import RequestFormatError = require('../errors/format')
import Dtos = require('../dtos')
import BillsFacade = require('../facade/billsFacade')

const router = express.Router()

const upload = multer()

router.post('/bills',
    upload.single('document'),
    [
        validator.check('description').isString().notEmpty(),
        validator.check('tags').isArray().notEmpty(),
        validator.check('groupId').isString().notEmpty()
    ],
    (request: express.Request, response: express.Response, next: express.NextFunction) => {
        RequestFormatError.nextForInvalidRequest(request, next)
        
        const dto = new Dtos.BillNoDocumentsDTO()
        Object.assign(dto, request.body)
      
        const facade = new BillsFacade()
        facade.createBill(dto, request['file'].buffer)
            .then((bill) => {
                response.status(200).send(bill)
            })
            .catch(next)
    })

router.put('/groups/:groupId/bills/:billId/documents',
    upload.single('document'),
    [validator.check('description').isString().notEmpty()],
    (request: express.Request, response: express.Response, next: express.NextFunction) => {
        RequestFormatError.nextForInvalidRequest(request, next)

        const billId = request.params.billId
        const groupId = request.params.groupId
        if (!billId) {
            return next(new RequestFormatError(['bill id is required']))
        }
        if (!groupId) {
            return next(new RequestFormatError(['group id is required']))
        }
    
        const document = new Dtos.AdditionalDocumentDTO()
        document.binary = request['file'].buffer 
        document.contentType = request['file'].mimetype
        document.description = request.body.description

        const facade = new BillsFacade()
        facade.putAdditionalDocument(groupId, billId, document)
            .then(() => {
                response.status(204).send()
            })
            .catch(next)
    })

router.put('/groups/:groupId/bills/:billId/paid',
    [
        validator.check('amount').isCurrency(),
        validator.check('paymentDate').isString().notEmpty()
    ],
    (request: express.Request, response: express.Response, next: express.NextFunction) => {
        RequestFormatError.nextForInvalidRequest(request, next)

        const billId = request.params.billId
        const groupId = request.params.groupId
        if (!billId) {
            return next(new RequestFormatError(['bill id is required']))
        }
        if (!groupId) {
            return next(new RequestFormatError(['group id is required']))
        }

        const paymentDetails = new Dtos.PaymentDetailsDTO()
        paymentDetails.paymentDate = new Date(request.body.paymentDate)
        paymentDetails.amount = request.body.amount

        const facade = new BillsFacade()
        facade.setBillAsPaid(groupId, billId, paymentDetails)
            .then(() => {
                response.status(204).send()
            })
            .catch(next)
    })

export = router
