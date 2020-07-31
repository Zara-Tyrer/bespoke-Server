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

describe("get all orders", (done) => {
  it("should get order with correct email address", async function() {
    let req = {
      query: {}
    }
    await utilities.getAllOrders(req).exec((err, orders) => {
      expect(orders[0].email).toBe("test@bespokeTest.co.uk")
    })
  })
})


describe("create an order", (done) => {
  it("should return a new order with Test User as name", function(done) {
    let req = {
        body: {
          name: "Test User-create",
          address: "123 Test St, London, E1 6AN",
          email: "testing@bnails.co.uk",
          phone_number: "01234567891",
          nail_length: 20,
          nail_shape: "square",
          nail_style: "sunflower",
          cost: 20,
          image: {
            description: "sunny",
            fileLink: "https://bespoke-nails.s3-ap-southeast-2.amazonaws.com/noImage.png"
          }
        }};
      utilities.addOrder(req).save((err, order) => {
        expect(order.name).toBe(req.body.name)
        done()
      })
  })
})

describe("Get order by id", (done) => {
  it("It should get a order with the username 'Test User'", function(done){
    let req = {
      params: {
        id: orderId
      }
    }
    utilities.getOrderById(req).exec((err, order) => {
      expect(order.name).toBe("Test User")
      done()
    })
  })
})

describe("Delete order", (done) => {
  it("Should delete the specified order", function (done){
    utilities.deleteOrder(orderId).exec(() => {
      Order.findById(orderId).exec((err, order) => {
        expect(order).toBe(null)
        done()
      })
    })
  })
})


//helper functions
function setUpData() {
  let testOrder = {}
  testOrder.name = "Test User"; 
  testOrder.address = "123 Made-up St, London, E1 6AN";
  testOrder.email = "test@bespokeTest.co.uk";
  testOrder.phone_number = "07911123456"
  testOrder.nail_length = 20;
  testOrder.nail_shape = "round";
  testOrder.nail_style = "hologram";
  testOrder.cost = 20;
  testOrder.image = {};
  testOrder.image.fileLink = "https://bespoke-nails.s3-ap-southeast-2.amazonaws.com/noImage.png";
  testOrder.image.description = "sunny";
  console.log(testOrder)
  return Order.create(testOrder)
}
  

function tearDownData() {
  return Order.deleteMany()
}
