Express Server Template - Template express server created by Code Like a Girl / Gentech team.

## Middleware

- cors
- body-parser
- Mongoose (Schema)
- Passport (authentication)
- Multer (S3)

## Default port

default (see App.js): 3001 


## Running Server

Install dependencies first by opening a terminal into the folder you have cloned this repo to, then run `npm i`. 
Scripts:
run `npm run start-dev` for development server (Nodemon)
run `npm start` for Node environment 

## Routes

baseURL = localhost:3001 or deployed server

- To fetch an individual Order
GET route: baseURL/orders/:id

- To create an Order
POST route: baseURL/orders/

//admin only
router.use(userAuthenticated)
//get all orders route - authentication
router.get("/", getOrders)
//delete order (cancellation)
router.delete("/:id", removeOrder)
//update order to mark as completed
router.put("/:id", changeOrder)

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
