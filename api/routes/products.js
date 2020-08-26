const express = require('express');
const router = express.Router();

const checkAuth = require('../middleware/check-auth');
const ProductController = require('../controllers/products');




router.get("/", ProductController.gets_allProducts);

router.post('/', checkAuth, ProductController.adding_product);


router.patch('/:productId', checkAuth, (req,res,next) =>{
    const id = req.params.productId;
    const updateOps = {};
    for(const ops of req.body){
        updateOps[ops.propName] = ops.value;
    }
    //{name:req.body.newName, price:req.body.newPrice}//replace with updaeOps
    Product.update({_id: id},{$set:updateOps})
       .exec()
       .then(result =>{
           console.log(result);
           res.status(200).json({
               message: 'Product updated',
               request:{
                   type:'GET',
                   url: 'http://localhost:3000/products/'+ id
               }
           });
       })
       .catch(err => {
           console.log(err);
           res.status(500).json({error: err});
       });
});


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