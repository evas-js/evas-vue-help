/**
 * Расширение базовых классов и объектов js.
 * @package @evas/vue-help
 * @author Egor Vasyakin <egor@evas-php.com>
 * @license CC-BY-4.0
 */

// Вспомогательный сахар
function defineFunction(target, name, value, enumerable = false) {
    Object.defineProperty(target, name, { value, enumerable })
}

// String

/**
 * Получение копии строки с обрезкой пустых символов и слэшей в начале и конце троки.
 * @return { String }
 */
defineFunction(String.prototype, 'trimSlashes', function () {
    return this.trim().replace(/^\/+|\/+$/g, '')
})

/**
 * Получение копии строки с приведением к верхнему регистру первого символа.
 * @returns { String }
 */
defineFunction(String.prototype, 'ucFirst', function () {
    return this.charAt(0).toUpperCase() + this.slice(1)
})
/**
 * Получение копии строки с приведением к нижнему регистру первого символа.
 * @returns { String }
 */
defineFunction(String.prototype, 'lcFirst', function () {
    return this.charAt(0).toLowerCase() + this.slice(1)
})

/**
 * Получение копии строки со сбросом регистра и стиля.
 * @returns { String } строка в нижнем регистре с пробелами 
 * вместо символов - и _, а также на границе букв нижнего и верхнего регистра
 */
defineFunction(String.prototype, 'unCaseString', function () {
    return this.trim()
    .replace(/-|_/g, ' ')
    .replace(/[A-Z]/g, match => ` ${match.toLowerCase()}`)
    .trim()
})
/**
 * Получение копии строки с приведением к camelCase.
 * @returns { String }
 */
defineFunction(String.prototype, 'toCamelCase', function () {
    return this.unCaseString().replace(/\s\w/g, match => match[1].toUpperCase())
})
/**
 * Получение копии строки с приведением к PascalCase.
 * @returns { String }
 */
defineFunction(String.prototype, 'toPascalCase', function () {
    return this.toCamelCase().ucFirst()
})


// Object

/**
 * Получение объекта, собранного из двух массивов: ключей и значений.
 * Аналог php функции array_combine.
 * @param { Array } arrayKeys массив ключей
 * @param { Array } arrayValues массив значений
 * @returns { Object }
 */
defineFunction(Object, 'combine', function (arrayKeys, arrayValues) {
    const obj = {}
    arrayKeys.forEach((key, index) => { obj[key] = arrayValues[index] })
    return obj
})
