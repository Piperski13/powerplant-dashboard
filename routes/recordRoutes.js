const express = require('express');
const recordController = require('../controllers/recordController.js');
const router = express.Router();


router.route('/').get(recordController.getAllRecords).post(recordController.addRecord);

router.route('/:id').get(recordController.getRecord).delete(recordController.deleteRecord).put(recordController.updateRecord);

module.exports = router;