const express = require("express");
const { deleteAll } = require("../controllers/chatController");

const router = express.Router();

router.route("/deleteAll").get(deleteAll);

module.exports = router;
