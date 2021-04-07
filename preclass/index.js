const CryptoHelper = require('./src/cryptoHelper');
const Decorator = require('./src/decorator');


function configureOverridenFunctions(cryptoHelper) {
    const fns = new Map();
    const writeFileOptions = {
        fn: async (filename, data, encoding = '') => {
            const byteArray = await cryptoHelper.createEncryptedFile(data);

            return [
                filename,
                byteArray,
                encoding
            ];
        },
        when: 'beforeOriginalCall'
    };

    fns.set('writeFile', writeFileOptions);

    const readFileOptions = {
        fn: async (data) => {
            const byteArray = await cryptoHelper.decriptFile(data);
            return byteArray;
        },
        when: 'afterOriginalCall'
    };

    fns.set('readFile', readFileOptions);
    return fns
}

; (async () => {
    // setup
    const vectorSize = 16
    const config = {
        password: 'Password used to generate key',
        initializationVectorKey: Buffer.alloc(vectorSize)
    }

    const cryptoHelper = await CryptoHelper.setup(config)
    const overridenFuncions = configureOverridenFunctions(cryptoHelper);
    Decorator.decorateModule(overridenFuncions, require('fs').promises);

    // run
    const fs = require('fs')
    const fileTarget = 'aeww2.js.enc'

    console.log('writing file to!', fileTarget)
    await fs.promises.writeFile(fileTarget, 'aee')

    console.log('readFile', (await fs.promises.readFile(fileTarget)).toString())
    console.log('terminou!')
})()


