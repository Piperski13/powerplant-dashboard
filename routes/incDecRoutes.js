const express = require("express");
const {incrementRecord, decrementRecord} = require("../controllers/incDecController.js");
const router = express.Router();

router.post('/increment', incrementRecord)

router.post('/decrement', decrementRecord)


module.exports = router;