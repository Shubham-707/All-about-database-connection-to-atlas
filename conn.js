//connecting to database
const mongoose = require('mongoose');
require('dotenv').config();

const uri = process.env.DB_CONNECTION;


mongoose.connect(uri).then(() => {
    console.log('connected to database')
}).catch((e) => {
    console.log('Not connected to database')
});