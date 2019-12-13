const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const Customer = require('../models/customer');

router.post('/signup', (req,res, next) =>{
    Customer.find({email: req.body.email})
       .exec()
       .then(customer =>{
           if(customer.length >= 1){
               res.status(409).json({
                   message:'Customer allready exits our systems!'
               })
           }else{
            bcrypt.hash(req.body.password,10,(err,hash) =>{
                if(err){
                    res.status(500).json({
                        error:err
                    });
                }else{
                       const customer = new Customer({
                        _id: mongoose.Types.ObjectId(),
                        email: req.body.email,
                        password: hash
                        });
                       customer.save()
                         .then(result =>{
                             console.log(result);
                             res.status(201).json({
                                 message: 'Customer created'
                             });
                         })
                         .catch(err =>{
                             console.log(err);
                             res.status(500).json({
                                 error:err
                             });
                         })
                    }
                });

           }
       })
   
});

router.delete('/:customerId',(req,res, next) =>{
    Customer.remove({_id: req.params.customerId})
    .exec()
    .then(customer =>{
        res.status(200).json({
            message: 'Customer deleted successfully'
        });
    })
    .catch(err =>{
        res.status(500).json({
            error:err
        })
    })
})


module.exports = router;