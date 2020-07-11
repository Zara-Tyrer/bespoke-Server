const express = require("express")
const router = express.Router()
const {getProducts, makeProduct} = require('../controllers/products_controller')


router.get("/", getProducts)

router.post("/", makeProduct)






module.exports = router