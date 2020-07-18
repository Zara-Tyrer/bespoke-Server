const express = require('express')
const router = express.Router()
const {makeOrder, getOrders, getOrder} = require("../controllers/orders_controller")

//require controller methods

//get all orders route - add authentication
router.get("/", getOrders)

//get an order - no auth so customer can search potentially by order number
router.get("/:id", getOrder)

//make an order route
router.post("/", makeOrder)


module.exports = router