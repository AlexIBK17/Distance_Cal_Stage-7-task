const express = require('express');
const index = express.Router();

const routeCont = require('../controller/routeController')

//all location
index.get('/all', routeCont.alLoc);

// new location
index.post('/new', routeCont.addLoc);

//calculate distance between fetched location & other locations
index.get('/:id/calculate', routeCont.disBtwLocs);

//fecthed specific location
index.get('/:id', routeCont.findLoc);

//edit location
index.put('/:id/edit', routeCont.edtLoc);

//delete location
index.delete('/:id/delete', routeCont.delLoc);


module.exports = index;