const View = require("../model/viewModel.js");
const Records = require("../model/recordsModel.js");
const Users = require("../model/usersModel.js");
const File = require("../model/filesModel.js");
const path = require("path");

const generateView = async (req, res) => {
  try {
    const name = req.query.name || "";
    const { id: user_id, is_admin } = req.user;

    const effectiveUserId = is_admin ? null : user_id;

    const records = await View.filterRecords(name, effectiveUserId);
    const totalPlantsData = await View.getAllPlants(name, effectiveUserId);
    const files = await File.getAll(effectiveUserId);

    const recordsWithFiles = records.map((record) => {
      const recordFiles = files.filter((f) => f.record_id === record.id);
      return { ...record, files: recordFiles };
    });

    res.render("recordsView", {
      name,
      records: recordsWithFiles,
      totalPlantsData,
      user: req.user,
      uploadsUrl: process.env.UPLOADS_URL,
    });
  } catch (error) {
    console.error("Error processing request:", error.message);
    res.status(500).send("Internal Server Error");
  }
};

const showWelcome = async (req, res) => {
  res.render("welcome", { user: req.user });
};

const showUsers = async (req, res) => {
  if (!req.user.is_admin) {
    return res.status(403).render("404");
  }

  const email = req.query.email || "";
  const data = await View.filterUsers(email);

  res.render("users", { user: req.user, data, email });
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

const showUpdateUser = async (req, res, next, errors = []) => {
  try {
    const { id } = req.params;
    let profile = null;

    if (id) {
      profile = await Users.getById(id);
    }

    res.render("updateUser", {
      user: req.user,
      profile,
      errors,
    });
  } catch (error) {
    console.error("Error in showAddRecord:", error.message);
    res.status(500).send("Internal Server Error");
  }
};

module.exports = {
  generateView,
  showWelcome,
  showUsers,
  showAddRecord,
  showUpdateUser,
};
