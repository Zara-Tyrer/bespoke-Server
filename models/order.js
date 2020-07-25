const mongoose = require("mongoose")
const Schema = mongoose.Schema

//define Order Schema
const Order = new Schema ({
    name: {
      type: String,
      required: true
    },
    address: {
      type: String
    },
    email: {
      type: String,
      required: true
    },
    phone_number: {
      type: String,
      required: true, 
      min: [11, "please enter a valid UK mobile number"],
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
    },
    completed: {
      type: Boolean,
      default: false
    },
    date_created: {
      type: Date,
      default: Date.now()
    },
    image: {
      description: { type: String },
      fileLink: { type: String }
    }
})


module.exports = mongoose.model("Order", Order)