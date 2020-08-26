const Product = require("../models/product");
const mongoose = require("mongoose");
const multer = require("multer");
const path = require("path");


//Multer setting
var storage = multer.diskStorage({
    destination: function(req, file, cb) {
      cb(null, "./uploads/");
    },
    filename: function(req, file, cb) {
      cb(
        null,
        file.fieldname + "-" + Date.now() + path.extname(file.originalname)
      );
    }
  });

  /* image file filter */
const fileFilter = (req, file, cb) =>{
    //reject a file
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'){
        cb(null, true);
    }else{
        cb(null, false);
    }
}

const upload = multer({
    storage: storage, 
    limits:{
    fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
});


/* GET PRODUCTS */
exports.gets_allProducts = (req, res, next) => {
  Product.find()
    .select("name, price,_id, productImage")
    .exec()
    .then((docs) => {
      const response = {
        count: docs.length,
        Products: docs.map((doc) => {
          return {
            name: doc.name,
            price: doc.price,
            _id: doc._id,
            productImage: doc.productImage,
            request: {
              type: "GET",
              url: "http://localhost:3000/products/" + doc._id,
            },
          };
        }),
      };
      // if(docs.length >=0){
      res.status(200).json(response);
      console.log(docs);
      /*  }else{
            res.status(404).json({
                message:'No entries found'
            });
          }  */
    })
    .catch((err) => {
      console.log(err);
      res.status(500);
      json({ error: err });
    });
};


/*POST PRODUCT */
exports.adding_product = upload.single('productImage'), (req,res,next) =>{
    //console.log(req.file);
    const product = new Product({
        _id:new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price,
        /* getting productImage via multer */
        productImage: req.file.path
    });
    product.save()
        .then(result =>{
        console.log(result);
        res.status(201).json({
            message:'Created product successfully',
            createdProduct: {
                name: result.name,
                price: result.price,
                _id: result._id,
                request:{
                    type: 'GET',
                    url: 'http://localhost:3000/products/'+ result._id
                }
            }
        });
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({error: err})
    });
   /*  res.status(201).json({
        message: 'Products Routes with POST',
        created: product
    }) */
};

router.get('/:productId', checkAuth, (req,res,next) =>{
    const id = req.params.productId;
    Product.findById(id)
        .select('name,price,_id, productImage')
        .exec()
        .then(doc =>{
           console.log("Comming from database",doc); 
           if(doc){
            res.status(200).json({
                product: doc,
                request:{
                    type: 'GET',
                    url: 'http://localhost:3000/products'
                }
            });
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