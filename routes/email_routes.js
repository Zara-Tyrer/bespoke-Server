const express = require('express')
const router = express.Router()
const {makeEmail, getAllEmails, removeEmail} = require('../controllers/emails_controller')
const {userAuthenticated} = require("../controllers/products_controller")

// make query open to customer
router.post("/", makeEmail)

router.use(userAuthenticated)
//admin only
router.get("/", getAllEmails)
router.delete("/:id", removeEmail)

module.exports = router