const {addQuery, getQueries, getQueryById, removeQuery, updateQuery} = require("../utils/query_utilities")

//make query
const makeQuery = function(req, res) {
  addQuery(req).save((err, query) => {
    if (err) {
      res.status(500)
      res.json ({
        error: err.message
      })
    }
    res.status(201)
    res.send(query)
  })
}

const getAllQueries = function(req, res) {
  getQueries(req).exec((err, queries) => {
    if (err) {
      res.status(500)
      res.json({
        error: err.message
      })
    }
    res.send(queries)
  })
}

const getAQuery = function 

module.exports = {makeQuery, getAllQueries }