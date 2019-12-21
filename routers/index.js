const express = require('express');
const router = express.Router();
const CategoryController = require('../controllers/category')
const ProductController = require('../controllers/product')


router.get('/', CategoryController.getTop);
router.get('/cat/:id/products', CategoryController.getByCatId);

router.get('/products/:id', ProductController.getByProId);
router.get('/signup', (req, res) => {
    res.render('signup')
})
router.get('/signin', (req, res) => {
    res.render('signin')
})
router.get('/sale-register', (req, res) => {
    res.render('sale_register.hbs')
})




module.exports = router;