const Record = require("../model/recordsModel.js");
const { body, validationResult } = require("express-validator");
const { showAddRecord } = require("./viewController.js");

const alphaErr = "must only contain letters.";
const lengthErr = "must be between 2 and 15 characters.";

const validateUser = [
  body("nazivelektrane")
    .trim()
    .isAlpha()
    .withMessage(`Nazivel Ektrane ${alphaErr}`)
    .isLength({ min: 2, max: 15 })
    .withMessage(`Nazivel Ektrane ${lengthErr}`),
  body("mesto")
    .trim()
    .isLength({ min: 2, max: 15 })
    .withMessage(`Mesto ${lengthErr}`),
  body("adresa")
    .trim()
    .isLength({ min: 2, max: 15 })
    .withMessage(`Adresa ${lengthErr}`),
];

const addRecord = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return showAddRecord(req, res, [], errors.array());
    }

    const {
      nazivelektrane,
      mesto,
      adresa,
      datumpustanjaurad,
      sifravrstepogona,
    } = req.body;

    const user_id = req.user.id;

    await Record.add({
      nazivelektrane,
      mesto,
      adresa,
      datumpustanjaurad,
      sifravrstepogona,
      user_id,
    });
    res.redirect("/viewPage/recordsViewPage");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteRecord = async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    const results = await Record.deleteById(id);

    if (results.rowCount === 0) {
      res.status(404).json({ message: `Record with ${id} was not found ` });
    }
    res.redirect("/viewPage/recordsViewPage");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateRecord = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return showAddRecord(req, res, [], errors.array());
    }

    const id = parseInt(req.params.id);
    const {
      nazivelektrane,
      mesto,
      adresa,
      datumpustanjaurad,
      sifravrstepogona,
    } = req.body;

    await Record.updateById({
      id,
      nazivelektrane,
      mesto,
      adresa,
      datumpustanjaurad,
      sifravrstepogona,
    });

    res.redirect("/viewPage/recordsViewPage");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  addRecord,
  deleteRecord,
  updateRecord,
  validateUser,
};
