const View = require("../model/viewModel.js");
const path = require("path");

const generateView = async (req, res) => {
  try {
    const name = req.query.name || "";
    const data = await View.filterData(name);
    const totalPlantsData = await View.getAllPlants();

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

const showAddRecord = async (req, res) => {
  res.render("addRecord", { user: req.user });
};
module.exports = { generateView, showWelcome, showAddRecord };
