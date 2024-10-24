const MenuItemModel = require("../Models/MenuItemsModel");

module.exports.getMenuItemListByResturantId = async (request, response) => {
  try {
    let data = request.params;
    let result = await MenuItemModel.find({
      restaurantId: data.res_id,
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
