module.exports = function getJSONKey(json, path = '') {
    var keys = path.split(/\.|\//)

    var key = keys.shift()

    if (!key && !keys.length) return json

    var value = json[key]

    return (keys.length && value) ?
        getJSONKey(value, keys.join('.')) :
        value
}