const express = require("express");
const router = express.Router();

const checkAuth = require("../middleware/check-auth");
const ProductController = require("../controllers/products");

router.get("/", ProductController.gets_allProducts);

router.post("/", checkAuth, ProductController.adding_product);

router.get("/:productId", checkAuth, ProductController.get_orderbyId);

router.patch("/:productId", checkAuth, ProductController.update_productbyId);

router.delete("/:productId", checkAuth, ProductController.delete_productbyId);

module.exports = router;
