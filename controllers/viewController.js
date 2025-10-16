const View = require("../model/viewModel.js");
const Records = require("../model/recordsModel.js");
const path = require("path");

const generateView = async (req, res) => {
  try {
    const name = req.query.name || "";
    const user_id = req.user.id;
    const data = await View.filterData(name, user_id);
    const totalPlantsData = await View.getAllPlants(user_id);

    res.render("recordsView", {
      name,
      data,
      totalPlantsData,
      user: req.user,
    });
  } catch (error) {
    console.error("Error processing request:", error.message);
    res.status(500).send("Internal Server Error");
  }
};

const showWelcome = async (req, res) => {
  res.render("welcome", { user: req.user });
};

const showAddRecord = async (req, res, next, errors = []) => {
  try {
    const { id } = req.params;
    let record = null;

    if (id) {
      record = await Records.getById(id);
    }

    res.render("addRecord", {
      user: req.user,
      record,
      errors,
    });
  } catch (error) {
    console.error("Error in showAddRecord:", error.message);
    res.status(500).send("Internal Server Error");
  }
};

module.exports = { generateView, showWelcome, showAddRecord };
