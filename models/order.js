const mongoose = require("mongoose")
const Schema = mongoose.Schema

//define Order Schema
const Order = new Schema ({
    name: {
      type: String,
      required: true
    },
    address: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    phone_number: {
      type: Number,
      required: true
    },
    nail_length: {
      type: Number,
      required: true
    }, 
    nail_shape: {
      type: String,
      required: true
    },
    nail_style: {
      type: String,
      required: true
    },
    cost: {
      type: Number,
      required: true
    }

})


module.exports = mongoose.model("Order", Order)