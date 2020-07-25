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
    if (product) {
      return res.send(product)
    }
    res.status(404)
    res.send("Product not found") 
    }
  )
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

// helper function for admin/user authentication
const userAuthenticated = function (req, res, next) {
  console.log("This is the user:", req.user)
  if (req.isAuthenticated()){
    next()
  } else {
    res.sendStatus(403)
  }
}




module.exports = {getProducts, makeProduct, getProduct, removeProduct, changeProduct, userAuthenticated}