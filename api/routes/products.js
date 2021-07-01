const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const checkAuth = require("../middleware/check-auth");
const ProductController = require("../controllers/product");


//Multer setting
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

/* image file filter */
const fileFilter = (req, file, cb) => {
  //reject a file
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
  fileFilter: fileFilter,
});


/**
 * @swagger
 * /products/:
 *   get:
 *      description: Used to Get All Product
 *      tags:
 *          - products
 *      parameters:
 *          - in: body
 *            name: Product
 *            description: Product List
 *            schema:
 *              type: object
 *      responses:
 *          '200':
 *              description: OK
 *          '500':
 *              description: Internal server error
 *          '400':
 *              description: Bad request
 */
router.get("/", ProductController.gets_allProducts);


/**
 * @swagger
 * /products/:
 *   post:
 *      description: Used to add new product
 *      tags:
 *          - products
 *      parameters:
 *          - in: body
 *            name: Product
 *            description: Product data
 *            schema:
 *              type: object
 *              required:
 *                 - name
 *                 - price
 *                 - productImage
 *              properties:
 *                  name:
 *                      type: string
 *                      minLength: 1
 *                      maxLength: 100
 *                      example: book
 *                  price:
 *                      type: number
 *                      minLength: 1
 *                      maxLength: 45
 *                      example: 35.00
 *                  productImage:
 *                      type: string
 *                      example: "book.jpg"
 *      responses:
 *          '200':
 *              description: Product added successfully
 *          '500':
 *              description: Internal server error
 *          '400':
 *              description: Bad request
 */
router.post("/", checkAuth, upload.single("productImage"), ProductController.adding_product);


/**
 * @swagger
 * /products/:productId:
 *   get:
 *      description: Used to get single product
 *      tags:
 *          - products
 *      parameters:
 *          - in: qurey
 *            name: Product
 *            description: Product Id
 *            schema:
 *              type: string
 *              required: true
 *              properties:
 *                  productId:
 *                      type: string
 *                      minLength: 1
 *                      maxLength: 100
 *                      example: asdkjasfkdjasfh
 *      responses:
 *          '200':
 *              description: OK
 *          '500':
 *              description: Internal server error
 *          '400':
 *              description: Bad request
 */
router.get("/:productId", checkAuth, ProductController.get_orderbyId);


/**
 * @swagger
 * /products/:productId:
 *   patch:
 *      description: Used to update product name
 *      tags:
 *          - products
 *      parameters:
 *          - in: qurey
 *            name: Product
 *            description: Product Name Update by Id
 *            schema:
 *              type: string
 *              required: true
 *              properties:
 *                  productId:
 *                      type: string
 *                      minLength: 1
 *                      maxLength: 100
 *                      example: asdkjasfkdjasfh
 *                  name:
 *                      type: string
 *                      minLength: 1
 *                      maxLength: 100
 *                      example: book
 *      responses:
 *          '200':
 *              description: Product Updated Successfully
 *          '500':
 *              description: Internal server error
 *          '400':
 *              description: Bad request
 */
router.patch("/:productId", checkAuth, ProductController.update_productbyId);


/**
 * @swagger
 * /products/:productId:
 *   delete:
 *      description: Used to delete product
 *      tags:
 *          - products
 *      parameters:
 *          - in: query
 *            name: Product
 *            description: Product Id
 *            required: true
 *      properties:
 *            productId:
 *                  type: string
 *                  minLength: 1
 *                  maxLength: 100
 *                  example: asdkjasfkdjasfh
 *      responses:
 *          '200':
 *              description: Product Deleted Successfully
 *          '500':
 *              description: Internal server error
 *          '400':
 *              description: Bad request
 */
router.delete("/:productId", checkAuth, ProductController.delete_productbyId);

module.exports = router;
