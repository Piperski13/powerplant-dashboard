const Users = require("../model/usersModel.js");
const { body, validationResult } = require("express-validator");
const { showAddRecord } = require("./viewController.js");

const alphaErr = "must only contain letters.";
const lengthErr = "must be between 2 and 15 characters.";

const validateUser = [
  body("nazivelektrane")
    .trim()
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

const deleteUser = async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    const results = await Users.deleteById(id);

    if (results.rowCount === 0) {
      res.status(404).json({ message: `User with ${id} was not found ` });
    }
    res.redirect("/viewPage/users");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateUser = async (req, res) => {
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

    await Users.updateById({
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
  deleteUser,
  updateUser,
  validateUser,
};
