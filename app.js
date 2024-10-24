// imports:
const express = require("express");
const mongoose = require("mongoose");
const app = express();
//instance:
const APIRouter = require("./Routes/APIRouter");
const cors = require("cors");

const PORT = 5003;
const URI = "mongodb://127.0.0.1:27017/zomatoapi";
// note==> under /db_name?
// const URI = `mongodb+srv://sanjivpaul:sanjiv123@batch-48.mmh6xlf.mongodb.net/zomatoapi?retryWrites=true&w=majority`

app.use(cors()); //enable cors request


// to enable or access post data (body-parser):
app.use(express.json());//convert string JSON data to pure json data
app.use(express.urlencoded({extended:false}))//normal post data to json data

app.use("/", APIRouter);

mongoose
  .connect(URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log("zomato api is running on port:", PORT);
    });
  })
  .catch((error) => {
    console.log(error);
  });
