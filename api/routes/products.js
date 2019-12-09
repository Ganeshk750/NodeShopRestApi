const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Product = require('../models/product');


router.get('/',(req,res, next) =>{
    res.status(200).json({
        message: 'Products Routes with GET'
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
    })
    .catch(err => console.log(err));
    res.status(201).json({
        message: 'Products Routes with POST',
        created: product
    })
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
    res.status(200).json({
        message:'Update product'
    });
});


router.delete('/:productId',(req,res,next) =>{
    res.status(200).json({
        message:'Deleted product'
    });
});

module.exports = router;