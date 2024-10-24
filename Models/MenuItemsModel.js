// 01.schema instance:
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//2.create schema
const MenuItemSchema = new Schema({
  name: { type: String },
  description: { type: String },
  ingridients: { type: Array },
  restaurantId: { type: String },
  image: { type: String },
  qty: { type: Number },
  price: { type: Number },
});

const MenuItemModel = mongoose.model("menuitem", MenuItemSchema, "menuitems");

//04Export Model:
module.exports = MenuItemModel;
