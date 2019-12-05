const express = require('express');
const app = express();
const productRoutes = require('./api/routes/products');
const ordersRoutes = require('./api/routes/orders');


const port = process.env.PORT || 3000;


app.get('/',(req,res) =>{
    res.status(200).json({
        message:'Wel Come To RestApi'
    })
});


app.use('/products',productRoutes);
app.use('/orders',ordersRoutes);


app.listen(port, () =>{
    console.log('Server is running on:'+ `${port}`);
})