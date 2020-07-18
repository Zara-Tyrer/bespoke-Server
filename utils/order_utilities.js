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
const deleteOrder = function(id) {
  return Order.findByIdAndRemove(id)
  // return Product.find
}

//edit to mark order as completed for Admin
const updateOrder = function(req) {
  return Order.findByIdAndUpdate(req.params.id, req.body, {new:true})
}


module.exports = {addOrder, getAllOrders, getOrderById, deleteOrder, updateOrder}