const express = require('express');
const router = express.Router();

router.get('/',(req,res, next) =>{
    res.status(200).json({
        message: 'Products Routes with GET'
    })
});

router.post('/',(req,res,next) =>{
    res.status(200).json({
        message: 'Products Routes with POST'
    })
});

router.get('/:productId',(req,res,next) =>{
    const id = req.params.productId;
    if(id === 'special'){
        res.status(200).json({
            message: 'You discovered new id',
            id: id
        })
    }else{
       res.status(200).json({
           message:'You passed an id'
       });
    }
})

module.exports = router;