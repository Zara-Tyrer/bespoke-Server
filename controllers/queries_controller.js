const {addQuery, getQueries, getQueryById, deleteQuery, updateQuery} = require("../utils/query_utilities")

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

//get all queries - admin only 
const getAllQueries = function(req, res) {
  getQueries(req).sort({
    date_created: -1
  }).
  exec((err, queries) => {
    if (err) {
      res.status(500)
      res.json({
        error: err.message
      })
    }
    res.send(queries)
  })
}

//get a query by id - admin
const getAQuery = function(req, res) {
  getQueryById(req).exec((err, query) => {
    if (query) {
      return res.send(query)
    }
    res.status(404)
    res.send("Query not found") 
  })
}

//remove (cancel by admin)
const removeQuery = function(req, res) {
  if(req.error) {
    res.status(req.error.status)
    res.send(req.error.message)
  } else {
    deleteQuery(req.params.id).exec(err => {
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

const changeQuery = function(req, res) {
  if(req.error) {
    res.status(req.error.status)
    res.send(req.error.message)
  } else {
    updateQuery(req).exec((err, query)=> {
      if(err) {
        res.status(500)
        res.json({
          error: err.message
        })
      }
      res.status(200)
      res.send(query)
    })
  }
}


module.exports = {makeQuery, getAllQueries, getAQuery, removeQuery, changeQuery }