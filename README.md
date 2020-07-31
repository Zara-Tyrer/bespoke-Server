# Bespoke Nails Server

This server has 3 main resources with CRUD functionality: Products, Orders and Queries. The server uses Passport Authentication for an Admin user, with no authentication required to access the public routes (see Routes below for specific routes). It has been built with Express using a Node environment and connects to a Mongo Database located on Atlas (Cloud MongoDB). An AWS S3 Bucket has been integrated for image upload for product and order, with the file URL stored as part of the product and order objects (see Schema design). 


## Middleware

- Cors
- Body-parser
- Mongoose (Schema)
- Passport (authentication)
- Multer (S3)
- Aws-sdk

## Dev dependencies

- Nodemon
- Mocha
- Expect
- dotenv

## Default port

Default port(see App.js): Local host 3001 

## Running Server

1. Install dependencies first by opening a terminal into the folder you have cloned this repo to, then run `npm i`. 
2. Scripts:
run `npm run start-dev` for development server (Nodemon)
run `npm start` for Node environment 

## Routes

baseURL = localhost:3001 or deployed server: https://bespoke-nails.herokuapp.com

**Orders**
_Public_
To fetch an individual Order
GET route: baseURL/orders/:id

To create an Order
POST route: baseURL/orders/

*Expects an order object (see Schema design)

_//The following routes require a logged in Admin user_
To see all orders
GET route: baseURL/orders

To delete an order
DELETE route baseURL/orders/:id

To mark an order as completed (update)
PUT route: baseURL/orders/:id

**Products**
_Public_
To fetch an individual product
GET route: baseURL/products/:id

To see all products
GET route: baseURL/products

_//The following routes require a logged in Admin user_
To create a product
POST route: baseURL/products/

*Expects a product object (see Schema design below)

To delete a product
DELETE route baseURL/products/:id

To update a product
PUT route: baseURL/products/:id

**Queries**
_Public_
To fetch an individual query
GET route: baseURL/query/:id

To create a query
POST route: baseURL/query/

_//The following routes require a logged in Admin user_
To see all queries
GET route: baseURL/query

To delete a query
DELETE route baseURL/query/:id

To update a query (Mark as responded)
PUT route: baseURL/query/:id

**File Upload**

To upload an image for product or order
POST route: baseURL/uploads

**Expects a file object in request

**Authentication**

To register an Admin user
POST route: baseURL/admin/register

To sign in as Admin user
POST route: baseURL/admin/login

To logout
GET route: baseURL/admin/logout

Active user session (to stay logged in after refresh)
GET route: baseURL/admin/user


## Resources 

Products

```Node
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
  },
  image: {
  description: { type: String },
  fileLink: { type: String }
  }
})
```


Orders
```Node
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
```

Queries
```Node
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
```

Admin Authentication/Authorization
Passport was used in implementation of Admin. 
```Node
const User = new Schema({
    username: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    }
})
```

## Testing 

- Mocha
- Manual testing using Client.http in Visual Studio Code
