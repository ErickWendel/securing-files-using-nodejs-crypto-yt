const { createCipheriv, createDecipheriv } = require('crypto')
 
class CryptoHelper {
    constructor({ cryptoKey }) {
        // aes-192-ecb
        // aes = Advanced Encryption Standard
        // 192 bits da chave
        // chave de 24 caracteres * 8 = 192 bits
        // ecb = Electronic Code Book -> mais simples para o nosso exemplo
        // para saber a infinidade de algoritmos disponiveis
        // openssl -cipher-algorithms
        this.cryptoConfig = Object.values({
            algorithm: 'aes-192-ecb',
            cryptoKey,
            initializationVectorKey: null,
        })
        // crypt(...['aes-192-ecb', cryptoKey, options])
    }

    static async setup({ cryptoKey }) {
        return new CryptoHelper({ cryptoKey })
    }

    async encrypt(data) {
        const cipher = createCipheriv(...this.cryptoConfig)

        return cipher
            // pode ser base64 ou hex
            .update(data, 'utf8', 'base64')
            .concat(cipher.final('base64'))
    }

    async decrypt(data) {
        const cipher = createDecipheriv(...this.cryptoConfig)
        
        return cipher
            .update(data.toString(), 'base64', 'utf-8')
            .concat(cipher.final('utf-8'))
    }

}

module.exports = CryptoHelper