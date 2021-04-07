const CryptoHelper = require('./src/cryptoHelper');
const CustomFsPromises = require('./src/customFSPromises');
const Decorator = require('./src/decorator');
const app = require('./src/app');

; (async () => {
    // setup
    
    const config = {
        // 24 caracteres * 8 = 192 bits
        // aes-192
        cryptoKey: 'minha-senha-super-segura',
    }

    const cryptoHelper = await CryptoHelper.setup(config)
    const overridenFuncions = new CustomFsPromises({ cryptoHelper }).configure()
    Decorator.decorateModule(overridenFuncions, require('fs').promises);

    // run
    await app.run()

})()


