const express = require("express");
const router = express.Router();

const checkAuth = require("../middleware/check-auth");
const customerController = require("../controllers/customer");

router.post("/signup", customerController.customer_signup);

router.post("/login", customerController.customer_Login);

router.delete("/:customerId", checkAuth, customerController.customer_delete);

module.exports = router;
