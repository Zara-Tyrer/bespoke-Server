//require utils methods
const {addOrder} = require('../utils/order_utilities.js')


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


module.exports = {makeOrder}