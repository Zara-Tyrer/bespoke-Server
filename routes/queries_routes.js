const express = require('express')
const router = express.Router()
const {makeQuery, getAllQueries, getAQuery, removeQuery, changeQuery} = require('../controllers/queries_controller')
const {userAuthenticated} = require("../controllers/products_controller")

// make query open to customer
router.post("/", makeQuery)

router.use(userAuthenticated)
//admin only
router.get("/", getAllQueries)
router.get("/:id", getAQuery)
router.put("/:id", changeQuery)
router.delete("/:id", removeQuery)

module.exports = router