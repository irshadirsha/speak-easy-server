const express = require('express');
const { createUser, CreateOrder, AddPdf, getPdfUrlById } = require('../controller/UserController');

const router = express.Router();

router.post('/', createUser);
router.post('/create-order',CreateOrder);

router.post('/upload-pdf',AddPdf)

router.get('/pdf/:id', getPdfUrlById);
module.exports = router;