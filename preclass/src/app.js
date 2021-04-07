const { promises } = require('fs')
async function run() {
    
    const fileTarget = 'super-secure-file.txt.enc'
    console.log('writing file to!', fileTarget)
    await promises.writeFile(fileTarget, 'aee')

    console.log('readFile', (await promises.readFile(fileTarget)).toString())
    console.log('terminou!')
}

module.exports = { run }