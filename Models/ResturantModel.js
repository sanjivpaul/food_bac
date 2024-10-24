// schema instance:
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//2.create schema
const ResturantSchema = new Schema({
  name: { type: String },
  city: { type: String },
  location_id: { type: Number },
  city_id: { type: Number },
  locality: { type: String },
  thumb: { type: Array },
  aggregate_rating: { type: Number },
  rating_text: { type: String },
  min_price: { type: Number },
  contact_number: { type: String },
  cuisine_id: { type: Array },
  cuisine: { type: Array },
  image: { type: String },
  mealtype_id: { type: Number },
});

const ResturantModel = mongoose.model(
  "resturant",
  ResturantSchema,
  "resturants"
);

module.exports = ResturantModel;
