import Models = require('../models')

class BillNoDocumentsDTO {
    id: string
    description: string
    barCode: string
    tags: Array<String>
    groupId: string
    status: Models.BillStatusType
}

class AdditionalDocumentDTO {
    id: string
    description: string
    contentType: string
    binary: Buffer
}

class PaymentDetailsDTO {
    amount: number
    paymentDate: Date
}

export = {
    BillNoDocumentsDTO,
    AdditionalDocumentDTO,
    PaymentDetailsDTO,
}