const express = require('express');
const app = express();
const morgan = require('morgan');
const productRoutes = require('./api/routes/products');
const ordersRoutes = require('./api/routes/orders');


const port = process.env.PORT || 3000;

app.use(morgan('dev'));

/* app.get('/',(req,res) =>{
    res.status(200).json({
        message:'Wel Come To RestApi'
    })
}); */


app.use('/products',productRoutes);
app.use('/orders',ordersRoutes);

/* Handling Error */

app.use((req,res,next) =>{
    const error = new Error('Not Found');
    res.status(404);
    next(error);
});

app.use((error,req,res,next) =>{
   res.status(error.status || 500).json({
       error:{
           message: error.message
       }
   });
});

app.listen(port, () =>{
    console.log('Server is running on:'+ `${port}`);
})