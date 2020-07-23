//require utils methods
const {addOrder, getAllOrders, getOrderById, deleteOrder, updateOrder} = require('../utils/order_utilities.js')

//get all orders - for admin
const getOrders = function(req, res) {
  getAllOrders(req).exec((err, orders) => {
    if (err) {
      res.status(500)
      res.json({
        error: err.message
      })
    }
    res.send(orders)
  })
}

//get individual order
const getOrder = function(req, res) {
  getOrderById(req).exec((err, order) => {
    if (order) {
      return res.send(order)
    }
    res.status(404)
    res.send("Order not found") 
    }
  )
}


//create an order
const makeOrder = function(req, res) {

  addOrder(req).save((err, order) => {
    if (err) {
      res.status(500)
      res.json({
        error: err.message
      })
    }
    res.status(201)
    res.send(order)
  })
}

const removeOrder = function(req, res) {
  if(req.error) {
    res.status(req.error.status)
    res.send(req.error.message)
  } else {
    deleteOrder(req.params.id).exec(err => {
      if(err) {
        res.status(500)
        res.json({
          error: err.message
        })
      }
      res.sendStatus(204)
    })
  }
}

//update for Admin to mark as completed
const changeOrder = function(req, res) {
  if(req.error) {
    res.status(req.error.status)
    res.send(req.error.message)
  } else {
    updateOrder(req).exec((err, order)=> {
      if(err) {
        res.status(500)
        res.json({
          error: err.message
        })
      }
      res.status(200)
      res.send(order)
    })
  }
}

module.exports = {makeOrder, getOrders, getOrder, removeOrder, changeOrder}