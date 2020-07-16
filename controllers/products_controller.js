const {addProduct, getAllProducts, getProductById} = require("../utils/product_utilities")


const getProducts = function(req, res) {
  getAllProducts(req).exec((err, products) => {
    if (err) {
      res.status(500)
      res.json({
        error: err.message
      })
    }
    res.send(products)
  })
}

const makeProduct = function(req, res) {
  // save the Product instance from addProduct
  addProduct(req).save((err, product) => {
  if (err) {
    res.status(500)
    res.json({
      error: err.message
    })
  }
  res.status(201)
  res.send(product)
  })
}

const getProduct = function(req, res) {
  getProductById(req).exec((err, product) => {
    if(err) {
      res.status(404)
      res.send("Product not found")
    }
    res.send(product)
  })
}

module.exports = {getProducts, makeProduct, getProduct}