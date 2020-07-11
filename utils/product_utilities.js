const Product = require('../models/product')


const getAllProducts = function(req) {
  return Product.find()
}

const addProduct = function(req) {
  return new Product(req.body)
}


module.exports = {getAllProducts, addProduct}