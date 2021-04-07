const { createCipheriv, createDecipheriv } = require('crypto');

class CryptoHelper {
    constructor({ cryptoKey, initializationVectorKey }) {
        

        // aes-192
        // chave de 24 caracteres * 8 = 192 bits
        // ecb = ECB(Electronic Code Book) => mais simples para o nosso exemplo
        // para saber a infinidade de algoritmos possiveis: openssl list -cipher-algorithms
        this.cryptoConfig = Object.values({
            algorithm: 'aes-192-ecb',
            cryptoKey,
            initializationVectorKey: null,
        })
    }

    static async setup({ cryptoKey, initializationVectorKey }) {
        return new CryptoHelper({ cryptoKey, initializationVectorKey })
    }

    async encrypt(data) {
        const cipher = createCipheriv(...this.cryptoConfig);
        return cipher
            .update(data, 'utf8', 'hex')
            .concat(cipher.final('hex'))
    }

    async decrypt(data) {
        const cipher = createDecipheriv(...this.cryptoConfig);

        return cipher
            .update(data.toString(), 'hex', 'utf8')
            .concat(cipher.final('utf8'));
    }
}

module.exports = CryptoHelper