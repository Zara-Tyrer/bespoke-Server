const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const productRouter = require("./routes/products_routes")
const passport = require('passport')
const session = require('express-session');
const MongoStore = require("connect-mongo")(session)

// Sets port if deploying to external provider 
// or port assigned already
const port = process.env.PORT || 3000;

// Equivalant of create server in http library
const app = express();


const whitelist = ['http://localhost:3000','https://reverent-rosalind-d6a50f.netlify.app/']
app.use(cors({
    credentials: true,
    origin: function (origin,callback) {
        // Check each url in whitelist and see if it includes the origin (instead of matching exact string)
        const whitelistIndex = whitelist.findIndex((url) => url.includes(origin))
        console.log("found whitelistIndex", whitelistIndex)
        callback(null,whitelistIndex > -1)
    }
}));

// Call the middleware we want to use
app.use(bodyParser.json());

if(process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}
    
const dbConn = process.env.MONGODB_URI || 'mongodb://localhost/bespoke_nails'  

mongoose.connect(
    dbConn, 
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false
    },
    err => {
      if (err) {
        console.log("Error connecting to database", err)
      } else {
        console.log("Connected to database!")
      }
    }
  )

//session must be before passport
app.use(session({
  // resave and saveUninitialized set to false for deprecation warnings
  secret: "Donutsfordays",
  resave: false,
  saveUninitialized: false,
  cookie: {
      maxAge: 1800000
  },
  store: new MongoStore({
      mongooseConnection: mongoose.connection
  })
}));

//passport authentication
require("./config/passport")
app.use(passport.initialize())
app.use(passport.session())

  
app.use("/products", productRouter) 

// Define a simple route for GET
app.get("/",(req,res) => {
    res.send("Hi from your Express Server. From past you. You are awesome.")
});

// Listen
app.listen(port, () => console.log(`Listening on port ${port}.`));