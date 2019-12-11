const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Order = require('../models/order');


router.get('/',(req,res,next) =>{
    res.status(200).json({
        message:'Ordereds were fatche'
    })
});

router.post('/', (req,res,next) =>{
    const order = new Order({
        _id: mongoose.Types.ObjectId(),
        quantity: req.body.quantity,
        product: req.body.productId
    });
    order.save()
      .exce()
      .then(result =>{
          console.log(result);
          res.status(200).json({result})
      })
      .catch()
    res.status(201).json({
        message: 'Order was created',
        order: order
    });
});

router.get('/:orderId',(req,res,next) =>{
    res.status(200).json({
        message: 'Order details',
        orderId: req.params.orderId
    });
});

router.delete('/:orderId',(req,res,next) =>{
    res.status(200).json({
        message: 'Order deleted',
        orderId: req.params.orderId
    });
});

module.exports = router;