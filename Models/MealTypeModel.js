//01. schema instance:
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//2.create schema
const MealTypeSchema = new Schema({
  name: { type: String },
  content: { type: String },
  image: { type: String },
  meal_type: { type: Number },
});

//03
const MealTypesModel = mongoose.model("mealtype", MealTypeSchema, "mealtypes");

//Export model
module.exports = MealTypesModel;
