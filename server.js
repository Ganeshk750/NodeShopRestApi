const express = require('express');
const app = express();
const productRoutes = require('./api/routes/products');

const port = process.env.PORT || 3000;


app.get('/',(req,res) =>{
    res.send('Wel Come to restApi');
});


app.use('/products',productRoutes);

app.listen(port, () =>{
    console.log('Server is running on:'+ `${port}`);
})