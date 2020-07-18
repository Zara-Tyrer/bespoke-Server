const Order = require("../models/order")

//get all orders


// get individual order - will need if we want a search?


// create order
const addOrder = function(req) {
  return new Order(req.body)
}


// delete order


//don't really need edit at this point?


module.exports = {addOrder}