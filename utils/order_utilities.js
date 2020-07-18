const Order = require("../models/order")

//get all orders

const getAllOrders = function(req) {
  return Order.find()
}

// get individual order - will need if we want a search?
const getOrderById = function(req) {
  return Order.findById(req.params.id)
}

// create order
const addOrder = function(req) {
  return new Order(req.body)
}


// delete order


//don't really need edit at this point?


module.exports = {addOrder, getAllOrders, getOrderById}