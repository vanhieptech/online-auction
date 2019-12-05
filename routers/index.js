const express = require('express');
const router = express.Router();
const CategoryController = require('../controllers/category')
const ProductController = require('../controllers/product')


router.get('/', CategoryController.getAll);
router.get('/cat/:id/products', CategoryController.getByCatId);

router.get('/products/:id', ProductController.getByProId);





module.exports = router;