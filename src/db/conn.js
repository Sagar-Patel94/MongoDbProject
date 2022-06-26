const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/smpatel")
.then(() => {
    console.log("Connection is successfully");
})
.catch((e) => {
    console.log("No connection");
})