const {addEmail, getEmails, getEmailById, deleteEmail} = require("../utils/email_utilities")

//make email
const makeEmail = function(req, res) {
  addEmail(req).save((err, email) => {
    if (err) {
      res.status(500)
      res.json ({
        error: err.message
      })
    }
    res.status(201)
    res.send(email)
  })
}

//get all emails - admin only 
const getAllEmails = function(req, res) {
  getEmails(req).exec((err, emails) => {
    if (err) {
      res.status(500)
      res.json({
        error: err.message
      })
    }
    res.send(emails)
  })
}

//get an email by id - admin
const getEmail = function(req, res) {
  getEmailById(req).exec((err, email) => {
    if (email) {
      return res.send(email)
    }
    res.status(404)
    res.send("Email not found") 
  })
}

//remove (cancel by admin)
const removeEmail = function(req, res) {
  if(req.error) {
    res.status(req.error.status)
    res.send(req.error.message)
  } else {
    deleteEmail(req.params.id).exec(err => {
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


module.exports = {makeEmail, getAllEmails, getEmail, removeEmail}