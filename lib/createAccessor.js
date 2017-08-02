var getJSONKey = require('./getJSONKey')

function createAccessor(json, key) {
    function get(key) {
        return getJSONKey(json, key)
    }
    function createAccessorFrom(fromKey) {
        var j = getJSONKey(json, fromKey)
        var acc = createAccessor(j)
        return acc
    }

    if (key) return createAccessorFrom(key)

    return {
        get,
        createAccessor: createAccessorFrom
    }
}

module.exports = createAccessor
