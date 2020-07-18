const mongoose = require("mongoose");
const expect = require("expect");
const utilities = require('../utils/order_utilities');
const Order = require('../models/order');
const {connectToDb, disconnectFromDb} = require('./config')

let orderId = null
before((done) => {
  // Connect to the database (same as we do in app.js)
  connectToDb(done);
});

after((done) => {
  disconnectFromDb(done);
})

beforeEach(async function () {
  // Load a test record in setupData
  // Use await so we can access the OrderId, which is used by some tests
  let order = await setUpData();
  orderId = order._id;
  });
  
  // Delete test data after each test
afterEach((done) => {
  // Execute the deleteMany query
  tearDownData().exec(() => done());
});


describe("create an order", (done) => {
  it("should return a new order with Test User as name", function(done) {
    let req = {
        body: {
          name: "Test User-create",
          address: "123 Test St, London, E1 6AN",
          email: "testing@bnails.co.uk",
          phone_number: 01234567891,
          nail_length: 20,
          nail_shape: "square",
          nail_style: "sunflower",
          cost: 20
        }
      }
      utilities.addOrder(req).save((err, order) => {
        expect(order.name).toBe(req.body.name)
        done()
      })
  })
})










//helper functions
function setUpData() {
  let testOrder = {}
  testOrder.name = "Test User"; 
  testOrder.address = "123 Made-up St, London, E1 6AN";
  testOrder.email = "test@bespokeTest.co.uk";
  testOrder.phone_number = 07911123456
  testOrder.nail_length = 20;
  testOrder.nail_shape = "round";
  testOrder.nail_style = "hologram";
  testOrder.cost = 20;
  return Order.create(testOrder)
}

function tearDownData() {
  return Order.deleteMany()
}
