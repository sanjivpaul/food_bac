# Making Connection with MongoDB by Mongoose

### 01.First initialize our express app

- 1.npm init -y
- 2.npm i express

> for connect our app.js with mongoDB server we use "mongoDB node.js Driver"

- mongoDB node.js Driver:
  - mongoDB (npmjs)
  - mongoose (npmjs)
    - asynchronous in nature

### 02.mongoose commands:

##### **app.js**: connecting mongoDB

```mongo
//import mongoose
const mongoose = require("mongoose");

const URI =  "mongodb://127.0.0.1:27017/batch48edurekasanjiv"

//connecting mongoose
mongose.connect(URI).then(()=>{}).catch(()=>{})

//example
mongoose.connect(URI).then(() => {
    app.listen(PORT, () => {
        console.log("db connected successfully !!!")
      console.log("zomato api is running on port:", PORT);
    });
  })
  .catch((error) => {
    console.log(error);
  });
```

#### **Model**

##### **LocationModel.js**

- 1.get schema instance

```mongo
const mongoose = require("mongoose");
const Schema = mongoose.schema;
```

- 2.create schema

```mongo
const LocationSchema = new Schema({
        _id: { type: Number },
        name: { type: String },
        city_id: { type: Number },
        location_id: { type: Number },
        country_name: { type: String },
    });
```

- 3.create model

```mongo
const LocationModel =mongoose.Model("location", LocationSchema, "location");
```

- 4.export model

```mongo
module.exports = LocationModel;
```

#### **Controller**

##### LocationController.js

- import model:

```mongo
const LocationModel = require("../Models/LocationModel");
```

- export Controller:

```mongo
module.exports.getLocationList = async (request, response) => {
    //read data ===> find()
    let result = await LocationModel.find();
        response.status(200).send({
            status: true,
            location: result,
        });
    };
```

## **app.js** file looks like

```js
//importing express:
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const APIRouter = require("./Routes/APIRouter");

const PORT = 5003;
const URI = "mongodb://127.0.0.1:27017/batch48edurekasanjiv";

//connecting to server:
app.use("/", APIRouter);
console.log("connecting to db...");

mongoose
  .connect(URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log("db connected successfully !!!");
      console.log("zomato api is running on port:", PORT);
    });
  })
  .catch((error) => {
    console.log(error);
  });
```

## **APIRouter.js** looks like

```js
const express = require("express");
const router = express.Router();

const location = require("../Controllers/LocationController");
const resturant = require("../Controllers/ResturantController");

// location
router.get("/api", location.home);
router.get("/api/location", location.getLocationList);

//resturants
router.get("/api/resturant", resturant.getResturantList);

module.exports = router;
```

## **LocationController.js** file looks like

```js
const LocationModel = require("../Models/LocationModel");

module.exports.home = (request, response) => {
  response.status(200).send({
    status: true,
  });
};

module.exports.getLocationList = async (request, response) => {
  //read data ===> find()
  let result = await LocationModel.find();
  response.status(200).send({
    status: true,
    location: result,
  });
};
```

## **POST**

for post we can post data manually through using postman

- POST
  - body
    - raw
      - JSON
        > then insert the json data manually

### 01.for access post data we can configure in **`app.js`**

```js
// to enable or access post data (body-parser):
app.use(express.json()); //convert string JSON data to pure json data
app.use(express.urlencoded({ extended: false })); //normal post data to json data
```

### 02.for access the data inside the controller we use a property `request.body` in **`UsersController.js`**

```js
module.exports.getSignUp = (request, response) => {
  let data = request.body; //for collecting data on server
  response.status(200).send({
    status: true,
    data,
  });
};
```

### 03.How to save a data?

we need to use two steps for save a data

- 01crate instance of usermodel
- 02use save method

### **SignUP**
**01create instance**

```js
//01create instance
let newUser = new UserModel({
  full_name: data.full_name,
  email: data.email,
  mobile: data.mobile,
  password: data.password,
});
```
**02save method**
```js
  //02save data
  newUser.save();
```
and overall our **`usercontroller.js`** looks like
>it is promise thats why we are using async await there.
```js
const UserModel = require("../Models/UsersModel");

module.exports.getLogIn = (request, response) => {
  response.status(200).send({
    status: true,
  });
};

module.exports.getSignUp = async (request, response) => {
  let data = request.body; //for collecting data on server

  //01create instance
  let newUser = new UserModel({
    full_name: data.full_name,
    email: data.email,
    mobile: data.mobile,
    password: data.password,
  });

  //02save data
  let result = await newUser.save();

  response.status(200).send({
    status: true,
    data,
    result,
  });
};

```
### **LogIn**
>it is promise thats why we use there async await.
```js
module.exports.getLogIn = async (request, response) => {
    let data = request.body;//access the data
    let result = await UserModel.find({email:data.email, password:data.password})//find operations
  response.status(200).send({
    status: true,
    result,
  });
};

```

## when we have large number of data we use destructuring data
>Destructuring: extracting data from array or an object.
```js
module.exports.filterData = async (request, response) => {
  // when we have large no. of data we use "destructuring data"
  //destructuring => extracting data from array or an object
  let { meal_type, location, cuisine, hcost, lcost, sort, page } = request.body;
  let filter = {};
  if (location !== undefined) filter["location_id"] = location; //runtime adding property(dynamic)

  console.log(filter);

  let result = await ResturantModel.find(filter);
  response.status(200).send({
    status: true,
    result,
  });
};
```

## RazorPay Server Side
### **1.1 Install Razorpay NodeJS SDK**
```js
//first command
npm i razorpay 
```

### **1.2 Instance of the Razorpay**
```js
//razorpay instance
var instance = new Razorpay({
  key_id: 'YOUR_KEY_ID',
  key_secret: 'YOUR_KEY_SECRET',
});
```
### **1.3 Create Order/Generate a id**
