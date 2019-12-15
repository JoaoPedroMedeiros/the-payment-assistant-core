import Models = require('../models')
import StorageService = require('../services/storageService')
import firestore = require('../config/firestoreProvider')
import BusinessError = require('../errors/business')
import BusinessCodes = require('../errors/codes')

class BillBusiness {

    async createPendingBill(groupId: string, billArg: Models.Bill, document: Buffer) {
        if (billArg.id) {
            throw new Error('id is not expected on creation')
        }

        const bill = new Models.Bill()
        bill.barCode = billArg.barCode
        bill.description = billArg.description
        bill.tags = billArg.tags
        bill.status = Models.BillStatusType.PENDING

        const groupRef = firestore
            .collection('groups')
            .doc(groupId)

        const groupSnapshot = await groupRef.get()

        if (!groupSnapshot.exists) {
            throw new BusinessError(BusinessCodes.GROUP_DOESNT_EXISTS)
        }    

        const billRef = groupRef
            .collection('bills')
            .doc()

        const storageService = new StorageService()
        bill.document = await storageService.uploadBillDocument(groupId, billRef.id, document)
        await billRef.set(Object.assign({}, bill))
        bill.id = billRef.id
        return bill
    }

    async putAdditionalDocument(groupId: string, billId: string, document: Models.AdditionalDocument, binary: Buffer) {
        const billRef = firestore.doc(`groups/${groupId}/bills/${billId}`)
        const snapshot = await billRef.get()

        if (!snapshot.exists) {
            throw new BusinessError(BusinessCodes.GROUP_OR_BILL_DONT_EXISTS)
        }
        
        const bill = new Models.Bill()
        Object.assign(bill, snapshot.data())

        const docRef = billRef.collection('additionalDocuments').doc()

        const additionalDocument = new Models.AdditionalDocument()
        additionalDocument.description = document.description
        additionalDocument.contentType = document.contentType
        
        const storageService = new StorageService()
        additionalDocument.path = await storageService.uploadAdditionalDocument(
            groupId,
            billId,
            docRef.id,
            additionalDocument.contentType,
            binary)

        additionalDocument.id = docRef.id

        bill.additionalDocuments = bill.additionalDocuments ? bill.additionalDocuments : []
        bill.additionalDocuments.push(additionalDocument)
        docRef.set(Object.assign({}, additionalDocument))
    }

    async setBillAsPaid(groupId: string, billId: string, paymentDetails: Models.PaymentDetails) {
        const billRef = firestore.doc(`groups/${groupId}/bills/${billId}`)
        const snapshot = await billRef.get()

        if (!snapshot.exists) {
            throw new BusinessError(BusinessCodes.GROUP_OR_BILL_DONT_EXISTS)
        }

        const data = snapshot.data()
        data.status = Models.BillStatusType.PAID
        data.paymentDetails = Object.assign({}, paymentDetails)
        await billRef.set(data)
    }
}

export = BillBusiness
