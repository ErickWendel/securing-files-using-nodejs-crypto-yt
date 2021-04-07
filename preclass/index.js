const CryptoHelper = require('./src/cryptoHelper');
const CustomFsPromises = require('./src/customFSPromises');
const Decorator = require('./src/decorator');
const app = require('./src/app');

; (async () => {
    // setup
    
    const config = {
        // aes-192
        // 24 caracteres * 8 = 192 bits
        cryptoKey: 'minha-senha-super-segura',
    }

    const cryptoHelper = await CryptoHelper.setup(config)
    const overridenFuncions = new CustomFsPromises({ cryptoHelper }).configure()
    Decorator.decorateModule(overridenFuncions, require('fs').promises);

    // run
    await app.run()

})()


