const express = require("express");
const {incrementRecord, decrementRecord} = require("../controllers/increment-decrement.js");
const router = express.Router();

router.post('/increment', (req,res)=>{
  const {sifravrstepogona} = req.body;
  incrementRecord(sifravrstepogona,res);
})
router.post('/decrement', (req,res)=>{
  const {sifravrstepogona} = req.body;
  decrementRecord(sifravrstepogona,res);
})

module.exports = router;