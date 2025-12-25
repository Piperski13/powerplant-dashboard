const express = require("express");
const { deleteAll } = require("../controllers/chatController");
const isAdmin = require("../middleware/isAdmin");

const router = express.Router();

router.route("/deleteAll").get(isAdmin, deleteAll);

module.exports = router;
