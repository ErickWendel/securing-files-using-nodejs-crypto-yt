const CryptoHelper = require('./src/cryptoHelper');
const CustomFsPromises = require('./src/customFSPromises');
const Decorator = require('./src/decorator');
const app = require('./src/app');

; (async () => {
    // setup
    const vectorSize = 16
    const config = {
        password: 'minha-senha-super-segura',
        initializationVectorKey: Buffer.alloc(vectorSize)
    }

    const cryptoHelper = await CryptoHelper.setup(config)
    const overridenFuncions = new CustomFsPromises({ cryptoHelper }).configure()
    Decorator.decorateModule(overridenFuncions, require('fs').promises);

    // run
    await app.run()

})()


