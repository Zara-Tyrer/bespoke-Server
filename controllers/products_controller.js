const {addProduct, getAllProducts, getProductById, deleteProduct, updateProduct} = require("../utils/product_utilities")


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

const removeProduct = function(req, res) {
  if(req.error) {
    res.status(req.error.status)
    res.send(req.error.message)
  } else {
    deleteProduct(req.params.id).exec(err => {
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

const changeProduct = function(req, res) {
  if(req.error) {
    res.status(req.error.status)
    res.send(req.error.message)
  } else {
    updateProduct(req).exec((err, product)=> {
      if(err) {
        res.status(500)
        res.json({
          error: err.message
        })
      }
      res.status(200)
      res.send(product)
    })
  }
}


module.exports = {getProducts, makeProduct, getProduct, removeProduct, changeProduct}