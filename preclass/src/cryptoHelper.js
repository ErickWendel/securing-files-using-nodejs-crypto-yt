const { createCipheriv, createDecipheriv, scrypt } = require('crypto');
const { promisify } = require('util');

class CryptoHelper {
    constructor({ cryptoKey, initializationVectorKey }) {
        this.cryptoConfig = Object.values({
            algorithm: 'aes-192-cbc',
            cryptoKey,
            initializationVectorKey,
        })
    }

    static async setup({ password, initializationVectorKey }) {
        const key = await promisify(scrypt)(password, 'salt', 24)
        return new CryptoHelper({ cryptoKey: key, initializationVectorKey })
    }

    async createEncryptedFile(data) {
        const cipher = createCipheriv(...this.cryptoConfig);
        return cipher
            .update(data, 'utf8', 'hex')
            .concat(cipher.final('hex'))
    }

    async decriptFile(data) {
        const cipher = createDecipheriv(...this.cryptoConfig);

        return cipher
            .update(data.toString(), 'hex', 'utf8')
            .concat(cipher.final('utf8'));
    }
}

module.exports = CryptoHelper