const express = require("express")
const router = express.Router()
const {getProducts, makeProduct, getProduct, removeProduct, changeProduct, userAuthenticated} = require('../controllers/products_controller')




router.get("/", getProducts)


router.get("/:id", getProduct)

//authenticate user before creating, editing or deleting a product
router.use(userAuthenticated)

router.post("/", makeProduct)
router.delete("/:id", removeProduct)
router.put("/:id", changeProduct)



module.exports = router