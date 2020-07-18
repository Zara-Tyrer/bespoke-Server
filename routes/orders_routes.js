const express = require('express')
const router = express.Router()
const {makeOrder, getOrders, getOrder, removeOrder, changeOrder} = require("../controllers/orders_controller")
const {userAuthenticated} = require("../controllers/products_controller")
//require controller methods



//get an order - no auth so customer can search potentially by order number
router.get("/:id", getOrder)

//make an order route
router.post("/", makeOrder)

//admin only
router.use(userAuthenticated)
//get all orders route - authentication
router.get("/", getOrders)
//delete order (cancellation)
router.delete("/:id", removeOrder)
//update order to mark as completed
router.put("/:id", changeOrder)


module.exports = router