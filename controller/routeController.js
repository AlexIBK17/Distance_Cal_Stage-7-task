//IMPORT AXIOS
const axios = require('axios');
//SCHEMA IMPORT
const Location = require('../model/Location');

//GET ALL LOCATIONS
async function alLoc(req, res) {
    try {
        const location = await Location.find();
        return res.json({
            sucess: true,
            count: location.length,
            data: location
        });
    } catch (error) {
        console.error(error);
    }
}

//REGISTER NEW LOCATION
async function addLoc(req, res) {
    try {
        const location = await Location.create(req.body)

        return res.json({
            sucess: true,
            data: location
        })
    } catch (error) {
        console.error(error);
        res.json({ error: 'Server error' })
    }
};


//FIND LOCAION
async function findLoc(req, res) {
    try {
        const id = req.params.id;
        const specLoc = await Location.findById(id);
        // console.log(specLoc);
        res.json({
            success: true,
            data: specLoc
        })
    } catch (error) {
        console.log(error)
        res.send("error")
    }
};

//CALCULATE DISTANCE BETWEEN TWO LOCATIONS
async function disBtwLocs(req, res) {
    const id = req.params.id;
    const specLoc = await Location.findById(id, 'coordinates');

    const datalong = specLoc.coordinates.coordinates[0];
    const datalat = specLoc.coordinates.coordinates[1];

    // console.log(datalong, datalat);

    //IMPORTS FROM RAPID-API
    const options = {
        method: 'GET',
        url: 'https://find-any-ip-address-or-domain-location-world-wide.p.rapidapi.com/iplocation',
        params: { apikey: process.env.API_KEY },
        headers: {
            'X-RapidAPI-Key': '9a77787023mshde445f2d0807fa2p16113fjsne8ee1f7a1e47',
            'X-RapidAPI-Host': 'find-any-ip-address-or-domain-location-world-wide.p.rapidapi.com'
        }
    };
    //CALLING AXIOS
    axios
        .request(options).then(function (response) {
            const currntLong = response.data.longitude;
            const currntLat = response.data.latitude;
            // console.log(currntLong, currntLat);

            //CALCULATING DISTANCE
            const total = getdistance(datalong, datalat, currntLong, currntLat);
            const R = 6371; // km
            const distance = Math.round(total * R);
            console.log(distance);
            res.json({
                sucess: true,
                result: distance,
                unit: 'km'
            })
        }).catch(function (error) {
            console.error(error);
        });

    //DISTANCE-CALCULATIONS FUNCTION
    function getdistance(x1, x2, y1, y2) {
        const locA = x1 - x2;
        const locB = y1 - y2;
        const distanceC = Math.sqrt((locA * locA) + (locB * locB));
        return distanceC;
    }
}

//EDIT LOCATION
async function edtLoc(req, res) {
    try {
        const id = req.params.id;
        const loca = req.body;
        const updateLoc = await Location.findByIdAndUpdate(id, { ...loca }, { new: true });
        console.log(updateLoc);
        res.json({
            success: true,
            message: 'data updated successfully',
            data: updateLoc
        });
    } catch (err) {
        console.log(err);
    }
}


//DELETE LOCATION
async function delLoc(req, res) {
    try {
        const id = req.params.id;
        const deleted = await Location.findByIdAndDelete(id);
        res.json({
            Success: 'Location deleted successfully',
            data: deleted
        })
    } catch (error) {
        res.send("unable to delete location")
    }
};


const routeCont = { alLoc, addLoc, findLoc, delLoc, edtLoc, disBtwLocs };
module.exports = routeCont;