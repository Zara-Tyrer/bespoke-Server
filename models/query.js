const mongoose = require('mongoose')
const Schema = mongoose.Schema

//define query schema
const Query = new Schema ({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  phone_number: {
    type: String, 
    required: true,
    min: [11, "please enter a valid phone number"]
  },
  date_created: {
    type: Date,
    default: Date.now()
  },
  message: {
    type: String,
    required: true
  },
  responded: {
    type: Boolean,
    default: false
  }

})


module.exports = mongoose.model("Query", Query)