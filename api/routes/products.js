const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Product = require('../models/product');


router.get('/',(req,res, next) =>{
    Product.find()
      .exec()
      .then(docs =>{
         // if(docs.length >=0){
            res.status(200).json(docs);
            console.log(docs);
         /*  }else{
            res.status(404).json({
                message:'No entries found'
            });
          }  */
      })
      .catch(err =>{
         console.log(err);
         res.status(500);json({error: err}); 
      })

});

router.post('/',(req,res,next) =>{
    const product = new Product({
        _id:new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price
    });
    product.save().then(result =>{
        console.log(result);
        res.status(201).json(result);
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({error: err})
    });
   /*  res.status(201).json({
        message: 'Products Routes with POST',
        created: product
    }) */
});

router.get('/:productId',(req,res,next) =>{
    const id = req.params.productId;
    Product.findById(id)
        .exec()
        .then(doc =>{
           console.log("Comming from database",doc); 
           if(doc){
            res.status(200).json(doc);
           }else{
             res.status(400).json({message:'No valid entry found for provided id'});
           }
          
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({error: err})
        });
    /* if(id === 'special'){
        res.status(200).json({
            message: 'You discovered new id',
            id: id
        })
    }else{
       res.status(200).json({
           message:'You passed an id'
       });
    } */ //This is testing static code

});


router.patch('/:productId',(req,res,next) =>{
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
           res.status(200).json(result);
       })
       .catch(err => {
           console.log(err);
           res.status(500).json({error: err});
       });
});


router.delete('/:productId',(req,res,next) =>{
   /*  res.status(200).json({
        message:'Deleted product'
    }); */
    const id = req.params.productId;
    Product.remove({_id:id})
       .exec()
       .then(result =>{
           res.status(200).json(result);
       })
       .catch(err =>{
           console.log(err);
           res.status(500).json({error: err});
       })
}); 

module.exports = router;