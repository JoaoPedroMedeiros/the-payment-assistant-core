import Dtos = require('../dtos')
import Models = require('../models')
import BillBusiness = require('../business/billsBusiness')

class BillsFacade {

    async createBill(billNoDocument: Dtos.BillNoDocumentsDTO, document: Buffer) {
        const billBusiness = new BillBusiness()

        const bill = new Models.Bill()
        bill.description = billNoDocument.description
        bill.barCode = billNoDocument.barCode
        bill.tags = billNoDocument.tags

        const result = new Dtos.BillNoDocumentsDTO()
        const createdBill = await billBusiness.createPendingBill(billNoDocument.groupId, bill, document)
        Object.assign(result, createdBill)
        return result
    }

    async putAdditionalDocument(groupId: string, billId: string, document: Dtos.AdditionalDocumentDTO) {
        const billBusiness = new BillBusiness()
        const additionalDocument = new Models.AdditionalDocument()
        additionalDocument.description = document.description
        additionalDocument.contentType = document.contentType
        const createdBill = await billBusiness.putAdditionalDocument(groupId, billId, additionalDocument, document.binary)

        const result = new Dtos.BillNoDocumentsDTO()
        Object.assign(result, createdBill)
        return result
    }

    async setBillAsPaid(groupId: string, billId: string, paymentDetails: Dtos.PaymentDetailsDTO) {
        const paymentDetailsModel = new Models.PaymentDetails()
        paymentDetailsModel.paymentDate = paymentDetails.paymentDate
        paymentDetailsModel.amount = paymentDetails.amount

        const billBusiness = new BillBusiness()
        await billBusiness.setBillAsPaid(groupId, billId, paymentDetailsModel)
    }
}

export = BillsFacade