const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const conn = await mongoose.connect('mongodb://localhost:27017/stage_7');
        console.log(`connected to mongoDB`)
    } catch (error) {
        console.log(error);
    }
}

module.exports = connectDB;