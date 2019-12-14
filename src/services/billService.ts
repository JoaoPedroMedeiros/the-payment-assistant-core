import gcloud = require('@google-cloud/pubsub')
import config = require('../config/gcloudConfig')
import BillGroup = require('../models/billGroup')

const topicName = 'bill-tracking'

class PendingBillRequest {
    groupId: string
    codebar: string
    pdf: string
    tags: string
}

class BillService {

    requestNewPendingBill = async (pendingBill: PendingBillRequest) => {
        const pubsub = new gcloud.PubSub({ projectId: config.projectId })
        const [topic] = await pubsub.createTopic(topicName)
        const publishingResult = await topic.publishJSON(pendingBill)
        return publishingResult
    }
}

export = BillService