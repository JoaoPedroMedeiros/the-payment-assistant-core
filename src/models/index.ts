enum BillStatusType {
    PENDING = 'PENDING',
    PAID = 'PAID'
}

class PaymentDetails {
    amount: number
    paymentDate: Date
}

class Bill {
    id: string
    description: string
    barCode: string
    status: BillStatusType
    tags: Array<string>
    additionalDocuments: Array<AdditionalDocument>
    paymentDetails: PaymentDetails
    document: string
}

class AdditionalDocument {
    id: string
    description: string
    contentType: string
    path: string
}

enum GroupStatusType {
    OPENED = 'OPENED',
    CLOSED = 'CLOSED'
}

class Group {
    id: string
    description: string
    status: GroupStatusType
    bills: []
}


export = {
    BillStatusType,
    PaymentDetails,
    AdditionalDocument,
    Bill,
    Group,
    GroupStatusType,
}