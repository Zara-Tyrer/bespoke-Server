const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

// Sets port if deploying to external provider 
// or port assigned already
const port = process.env.port || 3000;

// Equivalant of create server in http library
const app = express();

// Call the middleware we want to use
app.use(cors());
app.use(bodyParser.json());

if(process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
    }
    
const dbConn = process.env.MONGODB_URI || 'mongodb://localhost/bespoke_nails'  


// Define a simple route for GET
app.get("/",(req,res) => {
    res.send("Hi from your Express Server. From past you. You are awesome.")
});

// Listen
app.listen(port, () => console.log(`Listening on port ${port}.`));