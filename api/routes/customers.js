const express = require("express");
const router = express.Router();

const checkAuth = require("../middleware/check-auth");
const customerController = require("../controllers/customer");

router.post("/signup", customerController.customer_signup);
/**
 * @swagger
 * /users/signup:
 *   post:
 *      description: Used to register Customer
 *      tags:
 *          - users
 *      parameters:
 *          - in: body
 *            name: User
 *            description: User data
 *            schema:
 *              type: object
 *              required:
 *                 - emailId
 *                 - password
 *              properties:
 *                  emailId:
 *                      type: string
 *                      minLength: 1
 *                      maxLength: 100
 *                      example: navin@sample.com
 *                  password:
 *                      type: string
 *                      minLength: 1
 *                      maxLength: 45
 *                      example: abcd
 *      responses:
 *          '200':
 *              description: Resource added successfully
 *          '500':
 *              description: Internal server error
 *          '400':
 *              description: Bad request
 */

router.post("/login", customerController.customer_Login);

router.delete("/:customerId", checkAuth, customerController.customer_delete);

module.exports = router;
