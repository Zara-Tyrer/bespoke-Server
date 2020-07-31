const Email = require("../models/email")

// create email
const addEmail = function(req) {
  return new Email(req.body)
}

const getEmails = function(req) {
  return Email.find()
}

const getEmailById = function(req) {
  return Email.findById(req.params.id)
}

const deleteEmail = function(id) {
  return Email.findByIdAndRemove(id)
}


module.exports = {addEmail, getEmails, getEmailById, deleteEmail}
