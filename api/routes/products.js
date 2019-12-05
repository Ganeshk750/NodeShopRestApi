const express = require('express');
const router = express.Router();

router.get('/',(req,res) =>{
    res.send('Product routes is working');
})

module.exports = router;