const { eventOrder } = require("./constants")



class CustomFSPromises {
    constructor({ cryptoHelper }) {
        this.cryptoHelper = cryptoHelper
    }

    async writeFile(filename, data, enconding = '') {
        const encryptedText = await this.cryptoHelper.encrypt(data)

        return Object.values({ 
            filename,
            encryptedText,
            enconding
        })
    }

    async readFile(data) {
        const decrypted = await this.cryptoHelper.decrypt(data)
        return decrypted
    }
    configure() {
        const configuration = new Map()

        const writeFileOptions = {
            when: eventOrder.beforeOriginalCall,
            fn: this.writeFile.bind(this)
        }
        configuration.set(this.writeFile.name, writeFileOptions)
        
        const readFileOptions = {
            when: eventOrder.afterOriginalCall,
            fn: this.readFile.bind(this)
        }
        
        configuration.set(this.readFile.name, readFileOptions)

        return configuration

    }

}

module.exports = CustomFSPromises