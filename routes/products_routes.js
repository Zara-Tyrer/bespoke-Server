const express = require("express")
const router = express.Router()
const {getProducts, makeProduct, getProduct, removeProduct, changeProduct} = require('../controllers/products_controller')


router.get("/", getProducts)

router.post("/", makeProduct)

router.get("/:id", getProduct)

router.delete("/:id", removeProduct)

router.put("/:id", changeProduct)






module.exports = router