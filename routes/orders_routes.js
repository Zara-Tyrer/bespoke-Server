const express = require('express')
const router = express.Router()
const {makeOrder} = require("../controllers/orders_controller")

//require controller methods

//make order route
router.post("/", makeOrder)


module.exports = router