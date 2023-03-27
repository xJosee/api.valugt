const express = require('express');
const router = express.Router();
const upload = require('../config/multer');

const DPIController = require('../controllers/dpi.controller');;
const controller = new DPIController();

router.post('/', upload.single("file"), controller.predict);

module.exports = router;

