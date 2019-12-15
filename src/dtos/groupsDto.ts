import a = require('../models')

class GroupDTO {
    id: string
    description: string
    status: Models.GroupStatusType

    parse(group: Models.Group) {
        this.id = group.id
        this.description = group.description
        this.status = group.status
        return this
    }
}

export = GroupDTO
