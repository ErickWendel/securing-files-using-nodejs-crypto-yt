const { eventOrder } = require("./constants")

class Decorator {

    static #decorate = ({ fn, when }, oldFn) => async (...args) => {
        const [first, second] = when === eventOrder.afterOriginalCall ?
            [oldFn, fn] :
            [fn, oldFn]

        const result = await first.apply(this, args)

        const defaultFormat = Array.isArray(result) ? result : [result]
        return await second.apply(this, defaultFormat)

    }

    static decorateModule (overridenMethods, target) {
        const moduleClone = Object.assign({}, target)

        const finalFuncions = new Map()

        for (const [key, value] of overridenMethods) {
            const oldFn = Reflect.get(moduleClone, key)
            finalFuncions.set(key, this.#decorate(value, oldFn))
        }

        const newFunctions = Object.fromEntries(finalFuncions)

        Object.assign(target, newFunctions)
    }
}
module.exports = Decorator