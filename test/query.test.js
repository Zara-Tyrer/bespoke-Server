const mongoose = require("mongoose");
const expect = require("expect");
const utilities = require('../utils/query_utilities');
const Query = require('../models/query');
const {connectToDb, disconnectFromDb} = require('./config')

let queryId = null
before((done) => {
  // Connect to the database (same as we do in app.js)
  connectToDb(done);
});

after((done) => {
  disconnectFromDb(done);
})

beforeEach(async function () {
  // Load a test record in setupData
  // Use await so we can access the queryId, which is used by some tests
  let query = await setUpData();
  queryId = query._id;
  });
  
  // Delete test data after each test
afterEach((done) => {
  // Execute the deleteMany query
  tearDownData().exec(() => done());
});

describe("get all queries", (done) => {
  it("should get query with correct email address", async function() {
    let req = {
      query: {}
    }
    await utilities.getQueries(req).exec((err, queries) => {
      expect(queries[0].email).toBe("test@bespokeTest.co.uk")
    })
  })
})


describe("create a query", (done) => {
  it("should return a new query with Test User as name", function(done) {
    let req = {
        body: {
          name: "Test User",
          email: "testing@bnails.co.uk",
          phone_number: "01234567891",
          message: "How do I remove gel polish at home?"
        }
      }
      utilities.addQuery(req).save((err, query) => {
        expect(query.name).toBe(req.body.name)
        done()
      })
  })
})

describe("Get query by id", (done) => {
  it("It should get a query with the username 'Test User'", function(done){
    let req = {
      params: {
        id: queryId
      }
    }
    utilities.getQueryById(req).exec((err, query) => {
      expect(query.name).toBe("Test User")
      done()
    })
  })
})

describe("Delete query", (done) => {
  it("Should delete the specified query", function (done){
    utilities.deleteQuery(queryId).exec(() => {
      Query.findById(queryId).exec((err, query) => {
        expect(query).toBe(null)
        done()
      })
    })
  })
})


//helper functions
function setUpData() {
  let testQuery = {}
  testQuery.name = "Test User"; 
  testQuery.email = "test@bespokeTest.co.uk";
  testQuery.phone_number = "07911123456";
  testQuery.message = "This is a test message for Query"

  return Query.create(testQuery)
}

function tearDownData() {
  return Query.deleteMany()
}
