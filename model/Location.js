const mongoose = require('mongoose');
const geocoder = require('../utils/geocoder')

const locationSchema = mongoose.Schema;

//SCHEMA FOR STORE INFORMATION
const location = new locationSchema({
    locationId: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    address: {
        type: String,
        required: true
    },
    website: String,
    discription: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    contact_Person: {
        type: String,
        required: true
    },

    coordinates: {
        type: {
            type: String,
            enum: ['point']

        },
        coordinates: {
            type: [Number],
        },
        formattedAddress: String
    }
});

//USING GEOCODER TO AUTOMATICALLY GET LONG AND LAT WITH ADDRESS
location.pre('save', async function (next) {
    const loc = await geocoder.geocode(this.address);
    this.coordinates = {
        type: 'point',
        coordinates: [loc[0].longitude, loc[0].latitude],
        formattedAddress: loc[0].formattedAddress
    }
    next();
});

const locate = mongoose.model('Locations', location)

module.exports = locate;