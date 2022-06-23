var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET home page. */
router.get('/povcontrol', function (req, res, next) {
  res.render('povcontrol', { title: 'POV Control' });
});

router.get('/webcodec', function (req, res, next) {
  res.render('webcodec', { title: 'WebCodec test' });
});

router.get('/webxr', function (req, res, next) {
  res.render('webxr', { title: 'WebXR test' });
});

router.get('/resolution', function (req, res, next) {
  res.render('resolution', { title: 'resolution test' });
});

router.get('/resolution2', function (req, res, next) {
  res.render('resolution2', { title: 'resolution test' });
});


router.get('/shader', function (req, res, next) {
  res.render('shader', { title: 'resolution test' });
});

router.get('/mediastream', function (req, res, next) {
  res.render('mediastream', { title: 'resolution test' });
});


module.exports = router;
