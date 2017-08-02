var assert = require('assert')

var createAccessor = require('../index')

describe('json-link', function () {

    var json = {
        name: 'Axel',
        jobs: ['developer', {
            name: 'driver'
        }],
        location: {
            country: 'Argentina',
            coords: {
                latitude: 34,
                longitude: 57
            }
        }
    }

    var json$location, json$location$coords

    it('create an accessor for json.location and get country.', () => {
        json$location = createAccessor(json, 'location')
        var country = json$location.get('country')
        assert.equal(country, 'Argentina')
    })

    it('change json.location.country to "Brasil" and access it through existing json$location.', () => {
        json.location.country = 'Brasil'
        var country = json$location.get('country')
        assert.equal(country, 'Brasil')
    })

    it('create an accessor for json.location.coords and get latitude.', () => {
        json$location$coords = createAccessor(json, 'location.coords')
        var latitude = json$location$coords.get('latitude')
        assert.equal(latitude, 34)
    })

    it('returns a reference to subtree json.location.coords.', () => {
        var coordsAccessor = createAccessor(json, 'location.coords')
        var coords = coordsAccessor.get()
        coords.latitude = 29

        assert.equal(coordsAccessor.get('latitude'), 29)
        assert.equal(json.location.coords.latitude, coordsAccessor.get('latitude'))
    })

    it('deleting json.location and accessing it should not throw error.', () => {
        delete json.location
        if (json$location$coords.get()) throw new Error('ThisShouldNoBeHere')
    })

})