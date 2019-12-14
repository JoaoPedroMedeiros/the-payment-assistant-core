import BillGroupStatus = require('./billGroupStatus')

class BillGroup {
    id: string
    name: string
    status: BillGroupStatus
}

export = BillGroup
