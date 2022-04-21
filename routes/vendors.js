var express = require('express');
var path = require('path');
var router = express.Router();

router.use('/bootstrap', express.static(path.join(__dirname, "../node_modules/bootstrap/dist")));
router.use('/jquery', express.static(path.join(__dirname, "../node_modules/jquery/dist")));

module.exports = router;
