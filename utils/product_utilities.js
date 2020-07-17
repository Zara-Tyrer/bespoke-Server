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

const deleteProduct = function(id) {
  return Product.findByIdAndRemove(id)
  // return Product.find
}

const updateProduct = function(req) {
  return Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true
  })
}


module.exports = {getAllProducts, addProduct, getProductById, deleteProduct, updateProduct}