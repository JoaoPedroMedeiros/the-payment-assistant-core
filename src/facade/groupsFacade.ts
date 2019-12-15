import GroupBusiness = require('../business/groupsBusiness')
import GroupDTO = require('../dtos/groupsDto')

class GroupFacade {

    async createGroup(id: string, description: string): Promise<GroupDTO> {
        const business = new GroupBusiness()
        const group = await business.createGroup(id, description)
        return new GroupDTO().parse(group)
    }
}

export = GroupFacade
