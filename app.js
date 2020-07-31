const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const productRouter = require("./routes/products_routes")
const authRouter = require("./routes/auth_routes")
const orderRouter = require("./routes/orders_routes")
const queryRouter = require("./routes/queries_routes")
const emailRouter = require("./routes/email_routes")
const passport = require('passport')
const session = require('express-session');
const MongoStore = require("connect-mongo")(session)
const fileUploadRoutes = require('./routes/fileUploadRoutes')


// Sets port if deploying to external provider 
// or port assigned already
const port = process.env.PORT || 3001;

// Equivalent of create server in http library
const app = express();

const whitelist = ['http://localhost:3000','https://bespoke-nails.netlify.app/']
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

//use deployed database
const dbConn = process.env.MONGODB_URI || 'mongodb://localhost/bespoke_nails' 
// use on above line if need to do local testing: || 'mongodb://localhost/bespoke_nails'  

//mongoose connects to deployed database and display error
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
  // re-save and saveUninitialized set to false for deprecation warnings
  secret: "Donutsfordays",
  resave: false,
  saveUninitialized: false,
  cookie: {
      maxAge: 180000000
  },
  store: new MongoStore({
      mongooseConnection: mongoose.connection
  })
}));

//passport authentication
require("./config/passport")
app.use(passport.initialize())
app.use(passport.session())

app.use("/emails", emailRouter)
//routes
app.use("/products", productRouter) 
app.use("/admin", authRouter)
app.use("/orders", orderRouter)
app.use("/query", queryRouter)
//image upload
app.use("/uploads", fileUploadRoutes)

// Define a simple route for GET
app.get("/",(req,res) => {
    res.send("You are connected to the bespoke nails server")
});


// Listen
app.listen(port, () => console.log(`Listening on port ${port}.`));