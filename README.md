# json-link

Create simple data accessors for your jsons.

Having:
```js
var json = {
    name: 'Jerry',
    jobs: ['husband', {
        name: 'driver'
    }],
    location: {
        country: 'Earth-137 USA',
        coords: {
            latitude: 34,
            longitude: 57
        }
    }
}
```

You may grow tired of writing long strings to access `latitude`
```js
var currentLatitude = json.location.coords.latitude
```

Try this instead
```js
var createAccessor = require('json-link')
var jsonAccessor = createAccessor(json)
jsonAccessor.get('location.coords.latitude') // 34
```

shorter
```js
var createAccessor = require('json-link')
var jsonAccessor = createAccessor(json)
var coords = jsonAccessor.createAccessor('location.coords')
coords.get('latitude') // 34
```

shorter
```js
var createAccessor = require('json-link')
var coords = createAccessor(json, 'location.coords')
coords.get('latitude') // 34
```

get entire object
```js
coords.get()
//  {
//    latitude: 34,
//    longitude: 57
//  }
```

try mutating the json
```js
var coords = createAccessor(json, 'location.coords')

coords.get('latitude') // 34

// suppose latitude changes
json.location.coords.latitude = 31

// just reuse the accessor
coords.get('latitude') // 31
```

try mutating a subtree
```js
var coordsAccessor = createAccessor(json, 'location.coords')

var coords = coordsAccessor.get()
coords.latitude = 31

coordsAccessor.get('latitude') // 31
json.location.coords.latitude // 31
```