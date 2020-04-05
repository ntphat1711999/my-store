const router = require('express').Router();
const controller = require('../controllers/product.controller');

//multer
const multer = require('multer')
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname)
  }
})
const upload = multer({
  storage
});

router.route('/').get(controller.index);

router.route('/create')
  .get(controller.create)
  .post(upload.single('avatar'), controller.postCreate);

router.route('/update/:id')
  .get(controller.get)
  .post(upload.single('avatar'), controller.updateProduct);

router.route('/delete/:id')
  .get(controller.deleteProduct);

module.exports = router;