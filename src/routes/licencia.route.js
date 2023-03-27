const express = require('express');
const router = express.Router();
const upload = require('../config/multer');

const LicenciaController = require('../controllers/licencia.controller');;
const controller = new LicenciaController();

router.post('/', upload.single("file"), controller.predict);

module.exports = router;

