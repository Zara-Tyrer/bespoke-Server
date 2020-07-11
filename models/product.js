const mongoose = require("mongoose")
const Schema = mongoose.Schema

const Product = new Schema ({
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

module.exports = mongoose.model("Product", Product)