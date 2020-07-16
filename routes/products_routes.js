const express = require("express")
const router = express.Router()
const {getProducts, makeProduct, getProduct} = require('../controllers/products_controller')


router.get("/", getProducts)

router.post("/", makeProduct)

router.get("/:id", getProduct)






module.exports = router