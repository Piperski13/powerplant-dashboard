const Users = require("../model/usersModel.js");
const { body, validationResult } = require("express-validator");
const { showAddRecord } = require("./viewController.js");

const alphaErr = "must only contain letters.";
const lengthErr = "must be between 2 and 15 characters.";

const validateUser = [
  body("surname")
    .trim()
    .isAlpha()
    .withMessage(`Surname ${alphaErr}`)
    .isLength({ min: 2, max: 12 })
    .withMessage(`Surname ${lengthErr}`),
  body("lastname")
    .trim()
    .isAlpha()
    .withMessage(`Lastname ${alphaErr}`)
    .isLength({ min: 2, max: 12 })
    .withMessage(`Lastname ${lengthErr}`),
  body("email").isEmail().withMessage("Invalid email address"),
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
    const { email, surname, lastname } = req.body;

    const is_admin = req.body.is_admin ? true : false;

    await Users.updateById({
      id,
      email,
      surname,
      lastname,
      is_admin,
    });

    res.redirect("/viewPage/users");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  deleteUser,
  updateUser,
  validateUser,
};
