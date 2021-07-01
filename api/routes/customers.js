const express = require("express");
const router = express.Router();

const checkAuth = require("../middleware/check-auth");
const customerController = require("../controllers/customer");

/**
 * @swagger
 * /customers/signup:
 *   post:
 *      description: Used to register customer
 *      tags:
 *          - customers
 *      parameters:
 *          - in: body
 *            name: Customer
 *            description: Customer data
 *            schema:
 *              type: object
 *              required:
 *                 - email
 *                 - password
 *              properties:
 *                  email:
 *                      type: string
 *                      minLength: 1
 *                      maxLength: 100
 *                      example: test@sample.com
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
router.post("/signup", customerController.customer_signup);

/**
 * @swagger
 * /customers/login:
 *   post:
 *      description: Used to login customer
 *      tags:
 *          - customers
 *      parameters:
 *          - in: body
 *            name: Customer
 *            description: Customer data
 *            schema:
 *              type: object
 *              required:
 *                 - email
 *                 - password
 *              properties:
 *                  email:
 *                      type: string
 *                      minLength: 1
 *                      maxLength: 100
 *                      example: test@sample.com
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

/**
 * @swagger
 * /customers/:customerId:
 *   delete:
 *      description: Used to Delete customer
 *      tags:
 *          - customers
 *      parameters:
 *          - in: query
 *            name: string
 *            description: Customer Id
 *            required: true
 *      properties:
 *             productId:
 *                type: string
 *                minLength: 1
 *                maxLength: 100
 *                example: asdkjasfkdjasfh
 *      responses:
 *          '200':
 *              description: Resource deleted successfully
 *          '500':
 *              description: Internal server error
 *          '400':
 *              description: Bad request
 */
router.delete("/:customerId", checkAuth, customerController.customer_delete);

module.exports = router;
