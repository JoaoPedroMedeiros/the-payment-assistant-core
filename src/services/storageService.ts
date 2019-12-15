import bucket = require('../config/storageProvider')

class StorageService {

    promiseFor(uploadTask) {
        return new Promise((res, rej) => {
            uploadTask.then(res).catch(rej)
        })
    }

    private uploadIn(path: string, contentType: string, document: Buffer): Promise<string> {
        return new Promise((res, rej) => {
            const file = bucket.file(path);
            
            const stream = file.createWriteStream({
                metadata: {
                    contentType: contentType,
                },
                resumable: false,
            });
            
            stream.on('error', err => {
                rej(err)
            });
            
            stream.on('finish', () => {
                file.makePublic().then(() => {
                    res(path)
                });
            });
            
            stream.end(document);
        })
    }

    async uploadBillDocument(groupId: string, billId: string, document: Buffer): Promise<string> {
        return this.uploadIn(`groups/${groupId}/bills/${billId}/document.pdf`, 'application/pdf', document)
    }

    async uploadAdditionalDocument(groupId: string,billId: string, documentId: string, contentType: string, document: Buffer): Promise<string> {
        return this.uploadIn(`groups/${groupId}/bills/${billId}/additionals/${documentId}`, contentType, document)
    }
}

export = StorageService