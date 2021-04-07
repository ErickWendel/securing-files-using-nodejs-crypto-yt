const { createCipheriv, createDecipheriv } = require('crypto');

class CryptoHelper {
    constructor({ cryptoKey }) {
        

        // aes-192
        // aes = Advanced Encryption Standard
        // chave de 24 caracteres * 8 = 192 bits
        // ecb = ECB(Electronic Code Book) => mais simples para o nosso exemplo
        // para saber a infinidade de algoritmos possiveis: openssl list -cipher-algorithms
        this.cryptoConfig = Object.values({
            algorithm: 'aes-192-ecb',
            cryptoKey,
            initializationVectorKey: null,
        })
    }

    static async setup({ cryptoKey }) {
        return new CryptoHelper({ cryptoKey })
    }

    async encrypt(data) {
        const cipher = createCipheriv(...this.cryptoConfig);
        return cipher
            // pode ser hex ou base64
            .update(data, 'utf8', 'base64')
            .concat(cipher.final('base64'))
    }

    async decrypt(data) {
        const cipher = createDecipheriv(...this.cryptoConfig);

        return cipher
            .update(data.toString(), 'base64', 'utf8')
            .concat(cipher.final('utf8'));
    }
}

module.exports = CryptoHelper