const express = require("express");
const {
  updateUser,
  deleteUser,
  validateUser,
} = require("../controllers/usersController.js");
const router = express.Router();

router.route("/update/:id").post(validateUser, updateUser);
router.route("/delete/:id").post(deleteUser);

module.exports = router;
