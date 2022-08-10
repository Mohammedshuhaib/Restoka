const express = require('express')
const router = express.Router()
const multer = require("multer");
const configuration = require('../controller/configuration');
const createError = require('../createError');

// multer setup
let storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "./public");
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    },
  });
  let upload = multer({ storage: storage })


router.post('/submitForm' ,upload.single('image'),configuration.submitForm)

router.get('/getTable/:id', configuration.getTableCount)

router.get('/getFormData/:id', configuration.getFormData)






module.exports = router