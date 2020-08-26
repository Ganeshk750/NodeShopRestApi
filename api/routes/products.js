const express = require('express');
const router = express.Router();

const checkAuth = require('../middleware/check-auth');
const ProductController = require('../controllers/products');


router.get("/", ProductController.gets_allProducts);

router.post('/', checkAuth, ProductController.adding_product);

router.get("/:productId", checkAuth, ProductController.get_orderbyId);


router.patch('/:productId', checkAuth, ProductController.update_productbyId);


router.delete('/:productId', checkAuth, (req,res,next) =>{
   /*  res.status(200).json({
        message:'Deleted product'
    }); */
    const id = req.params.productId;
    Product.remove({_id:id})
       .exec()
       .then(result =>{
           res.status(200).json({
               message: 'Product deleted',
               request:{
                   type: 'POST',
                   url: 'http://localhost:3000/products',
                   body: {name: String, price: Number}
               }
           });
       })
       .catch(err =>{
           console.log(err);
           res.status(500).json({error: err});
       })
}); 

module.exports = router;