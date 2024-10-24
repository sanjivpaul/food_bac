const MealTypesModel = require("../Models/MealTypeModel");

module.exports.getMealTypes = async (request, response) => {
  try {
    let result = await MealTypesModel.find();
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
