import BillGroup = require('./billGroup')
import BillStatus = require('./BillStatus')

class Bill {
    group: BillGroup
    tags: string[]
    barcode: string
    pdf: string
    status: BillStatus

}

export = Bill
