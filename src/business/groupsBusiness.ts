import Models = require('../models')
import firestore = require('../config/firestoreProvider')
import BusinessError = require('../errors/business')
import BusinessCodes = require('../errors/codes')

class GroupBusiness {

    async createGroup(id: string, description: string): Promise<Models.Group> {
        const group = new Models.Group()
        group.id = id
        group.description = description
        group.status = Models.GroupStatusType.OPENED

        const docRef = firestore
            .collection('groups')
            .doc(group.id)
        
        const snapshot = await docRef.get()

        if (snapshot.exists) {
            throw new BusinessError(BusinessCodes.GROUP_ALREADY_EXISTS)
        }
        docRef.set(Object.assign({}, group))
        return group
    }
}

export = GroupBusiness
