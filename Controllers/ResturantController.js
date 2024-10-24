const { response } = require("express");
const ResturantModel = require("../Models/ResturantModel");

module.exports.getResturant = async (request, response) => {
  try {
    let result = await ResturantModel.find();
    response.status(200).send({
      status: true,
      result,
    });
  } catch (error) {
    response.status(200).send({
      status: false,
      error,
    });
  }
};

module.exports.getResturantListByLocId = async (request, response) => {
  try {
    let loc_id = request.params.loc_id;
    let result = await ResturantModel.find({
      location_id: loc_id,
    });
    response.status(200).send({
      status: true,
      result,
    });
  } catch (error) {
    response.status(500).send({
      status: false,
      error,
    });
  }
};

module.exports.getResturantDetailsById = async (request, response) => {
  try {
    let rest_id = request.params.id;
    //findOne returns only one object
    let result = await ResturantModel.findOne({ _id: rest_id });
    if (result) {
      response.status(200).send({
        status: true,
        result,
      });
    } else {
      response.status(200).send({
        status: false,
        message: "resturant not found",
      });
    }
  } catch (error) {
    response.status(200).send({
      status: false,
      error,
      message: "server error, contact to admin",
    });
  }
};

module.exports.filterData = async (request, response) => {
  // when we have large no. of data we use "destructuring data"
  //destructuring => extracting data from array or an object

  let { meal_type, location, cuisine, hcost, lcost, sort, page } = request.body;

  // #sort:
  // sort ==> min_price ==> 1 ==> low to high
  // sort ==> min_price ==> -1 ==> high to low
  //sort = sort === undefined? 1 : sort;//ternary operator

  //lcost ==> 0
  //hcost ==> 500

  if (sort === undefined) {
    sort = 1;
  }

  if (page === undefined) {
    page = 1;
  }
  const itemsPerPage = 2;

  let startIndex = itemsPerPage * page - itemsPerPage; // 2 * 1 - 2 = 0
  let endIndex = itemsPerPage * page; // 2 * 1 = 2

  let filter = {};
  if (location !== undefined) filter["location_id"] = location; //runtime adding property(dynamic)
  if (meal_type !== undefined) filter["mealtype_id"] = meal_type; //this is now working!
  if (cuisine !== undefined) filter["cuisine_id"] = { $in: cuisine }; //reference line no.67
  if (hcost !== undefined && lcost !== undefined)
    filter["min_price"] = { $gte: lcost, $lte: hcost }; //refrence line no. 72


  console.log(filter);
  //here we are using projection in find after filter
  let result = await ResturantModel.find(filter, {
    name: 1,
    city: 1,
    locality: 1,
    min_price: 1,
    cuisine: 1,
    image:1,
  }).sort({
    min_price: sort,
  });
  const filteredResponse = result.slice(startIndex, endIndex); //line no 83
  response.status(200).send({
    status: true,
    // result,
    page: filteredResponse,
  });
};
