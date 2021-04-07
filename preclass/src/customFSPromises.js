const { eventOrder } = require("./constants");


class CustomFsPromises {
    constructor({ cryptoHelper }) {
        this.cryptoHelper = cryptoHelper
    }
    async writeFile(filename, data, encoding = '') {
        const byteArray = await this.cryptoHelper.encrypt(data);

        return [
            filename,
            byteArray,
            encoding
        ];
    }
    async readFile(data) {
        const byteArray = await this.cryptoHelper.decrypt(data);
        return byteArray;
    }

    configure() {
        const configuration = new Map();
        const writeFileOptions = {
            fn: this.writeFile.bind(this),
            when: eventOrder.beforeOriginalCall
        };

        configuration.set(this.writeFile.name, writeFileOptions);

        const readFileOptions = {
            fn: this.readFile.bind(this),
            when: eventOrder.afterOriginalCall
        };

        configuration.set(this.readFile.name, readFileOptions);

        return configuration
    }
}

module.exports = CustomFsPromises