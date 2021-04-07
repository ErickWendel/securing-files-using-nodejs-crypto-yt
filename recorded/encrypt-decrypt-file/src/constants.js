const eventOrder = { 
    beforeOriginalCall: Symbol('beforeOriginalCall'),
    afterOriginalCall: Symbol('afterOriginalCall'),
}

module.exports = { eventOrder }