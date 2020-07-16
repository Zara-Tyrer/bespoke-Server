const Product = require('../models/product')


const getAllProducts = function(req) {
  return Product.find()
}

const addProduct = function(req) {
  return new Product(req.body)
}

const getProductById = function(req) {
  return Product.findById(req.params.id)
}


module.exports = {getAllProducts, addProduct, getProductById}