const Query = require("../models/query")

// create query
const addQuery = function(req) {
  return new Query(req.body)
}

const getQueries = function(req) {
  return Query.find()
}

const getQueryById = function(req) {
  return Query.findById(req.params.id)
}

const removeQuery = function(id) {
  return Query.findByIdAndRemove(id)
}

const updateQuery = function(req) {
  return Query.findByIdAndUpdate(req.params.id, req.body, {new:true})
}


module.exports = {addQuery, getQueries, getQueryById, removeQuery, updateQuery}