var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', {
    title: 'Express'
  });
});


var multer = require('multer');
var getIPAdress = require('../util/getIPAdress')
var waterMark = require('../util/waterMark')

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/images')
  },
  //确定图片存储时的名字,注意，如果使用原名，可能会造成再次上传同一张图片的时候的冲突
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`)
  }
});
//生成的专门处理上传的一个工具，可以传入storage、limits等配置
var upload = multer({
  storage
});
/**
 * 不加水印上传图片
 */
router.post('/upload', upload.single('file'), function (req, res, next) {
  var url = req.file.filename;
  res.send({
    imgURL: `http://${getIPAdress()}:3000/images/${url}`,
    code: 200
  })
})

/**
 * 加水印上传图片
 */
router.post('/imgUploadAddSY', upload.single('file'), function (req, res, next) {
  var url = req.file.filename;
  waterMark(`public/images/${url}`);
  res.json({
    imgURL: `http://${getIPAdress()}:3000/images/${url}`,
    code: 200
  })

});















module.exports = router;