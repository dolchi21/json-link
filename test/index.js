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

    var json$location

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

    it('returns a reference to subtree json.location.coords.', () => {
        var coordsAccessor = createAccessor(json, 'location.coords')
        var coords = coordsAccessor.get()
        coords.latitude = 29

        assert.equal(coordsAccessor.get('latitude'), 29)
        assert.equal(json.location.coords.latitude, coordsAccessor.get('latitude'))
    })

})