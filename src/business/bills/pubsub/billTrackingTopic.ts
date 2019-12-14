import gcloud = require('@google-cloud/pubsub')
import config = require('../../../config/gcloudConfig')

const pubsub = new gcloud.PubSub({ projectId: config.projectId })
const topic = pubsub.createTopic('bill-tracking')

