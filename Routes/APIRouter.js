// import express:
const express = require("express");

// create router instance:
const router = express.Router();

// import controllers:
const location = require("../Controllers/LocationController");
const resturant = require("../Controllers/ResturantController");
const meal_type = require("../Controllers/MealTypeController");
const menu_items = require("../Controllers/MenuItemsController");
const users = require("../Controllers/UsersController");
const payment = require("../Controllers/PaymentController");

//location api
router.get("/api/home", location.home);
router.get("/api/get-location", location.getLocationList);

// resturant:
router.get("/api/get-resturant", resturant.getResturant);
router.get(
  "/api/get-resturant-by-location-id/:loc_id",
  resturant.getResturantListByLocId
);
router.get(
  "/api/get-resturant-details-by-id/:id",
  resturant.getResturantDetailsById
);
router.post("/api/filter", resturant.filterData);
// router.post("/api/filter:page", resturant.filterData);

//mealtype api:
router.get("/api/get-meal-types", meal_type.getMealTypes);

//menuitems:
router.get(
  "/api/get-menu-item-list-by-resturant-id/:res_id",
  menu_items.getMenuItemListByResturantId
);

// user:
router.post("/api/login", users.getLogIn);
router.post("/api/sign-up", users.getSignUp);

//razorpay
router.post("/api/payment/gen-order", payment.getOrderId);
router.post("/api/payment/verify", payment.verifyPayment);

// export router instance:
module.exports = router;
