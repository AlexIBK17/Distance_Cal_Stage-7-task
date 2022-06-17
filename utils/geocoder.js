const NodeGeocoder = require('node-geocoder');

const options = {
    provider: 'mapquest',

    // Optional depending on the providers
    httpAdapter: 'http://open.mapquestapi.com/geocoding/v1/address',
    apiKey: 'ICmBTBuD95zKsuMa6rFqQ5FD0FKBdpwG',
    formatter: null // 'gpx', 'string', ...
};

const geocoder = NodeGeocoder(options);

module.exports = geocoder;
