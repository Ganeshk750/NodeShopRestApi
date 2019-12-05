const express = require('express');
const app = express();
const productRoutes = require('./api/routes/products');

const port = process.env.PORT || 3000;


app.get('/',(req,res) =>{
    res.status(200).json({
        message:'Wel Come To RestApi'
    })
});


app.use('/products',productRoutes);

app.listen(port, () =>{
    console.log('Server is running on:'+ `${port}`);
})