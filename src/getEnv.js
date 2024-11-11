/**
 * Получение свойства/свойств .env с учётом сборщика.
 * @package @evas/vue-help
 * @author Egor Vasyakin <egor@evas-php.com>
 * @license CC-BY-4.0
 */

/** @var { Object[] } drivers доступные драйвера */
const drivers = [
    {
        name: 'vue-cli',
        check: () => typeof process?.env !== 'undefined',
        path: () => process?.env,
        prefix: 'VUE_APP_',
    },
    {
        name: 'vite',
        check: () => typeof import.meta !== 'undefined',
        path: () => import.meta.env,
        prefix: 'VITE_',
    }
]

/**
 * @param { String, Array, Object } keys ключ свойства или массив ключей или объект { ключ: значение по умолчанию }
 * @param { any } val значение по умолчанию если в первом аргументе ключ
*/
export function getEnv(keys, val) {
    if (!keys) return val || keys
    const driver = drivers.find(driver => {
        try { return driver.check()}
        catch (e) { return false }
    })
    const get = (key, val) => driver.path()?.[driver.prefix + key] || val
    return typeof keys === 'object' ? (
        Array.isArray(keys) 
        ? keys.map(key => get(key))
        : Object.entries(keys).map(([key, val]) => get(key, val))
    ) : get(keys, val)
}
