const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const checkAuth = require("../middleware/check-auth");
const ProductController = require("../controllers/products");


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

router.get("/", ProductController.gets_allProducts);

router.post("/", checkAuth, upload.single("productImage"), ProductController.adding_product);

router.get("/:productId", checkAuth, ProductController.get_orderbyId);

router.patch("/:productId", checkAuth, ProductController.update_productbyId);

router.delete("/:productId", checkAuth, ProductController.delete_productbyId);

module.exports = router;
