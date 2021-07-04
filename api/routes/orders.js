const express = require("express");
const router = express.Router();
const checkAuth = require("../middleware/check-auth");

const OrdersController = require("../controllers/order");

/* Handling incoming get request to orders */
/**
 * @swagger
 * /orders/:
 *   get:
 *      description: Used to Get All Orders
 *      tags:
 *          - orders
 *      parameters:
 *          - in: body
 *            name: Order
 *            description: Order List
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
router.get("/", checkAuth, OrdersController.orders_gets_all);

/**
 * @swagger
 * /orders/:
 *   post:
 *      description: Used to Create Order
 *      tags:
 *          - orders
 *      parameters:
 *          - in: body
 *            name: Order
 *            description: Create Order 
 *            schema:
 *              type: object
 *              required:
 *                 - product
 *                 - quantity
 *              properties:
 *                  product:
 *                      type: string
 *                      minLength: 1
 *                      maxLength: 100
 *                      example: book
 *                  quantity:
 *                      type: number
 *                      minLength: 1
 *                      maxLength: 45
 *                      example: 2
 *      responses:
 *          '200':
 *              description: OK
 *          '500':
 *              description: Internal server error
 *          '400':
 *              description: Bad request
 */
router.post("/", checkAuth, OrdersController.orders_create_order);

/**
 * @swagger
 * /orders/:orderId:
 *   get:
 *      description: Used to get single order
 *      tags:
 *          - orders
 *      parameters:
 *          - in: qurey
 *            name: Order
 *            description: Order Id
 *            schema:
 *              type: string
 *              required: true
 *              properties:
 *                  OrderId:
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
router.get("/:orderId", checkAuth, OrdersController.orders_get_order);


/**
 * @swagger
 * /orders/:orderId:
 *   delete:
 *      description: Used to delete single order
 *      tags:
 *          - orders
 *      parameters:
 *          - in: qurey
 *            name: Order
 *            description: Order Id
 *            schema:
 *              type: string
 *              required: true
 *              properties:
 *                  OrderId:
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
router.delete("/:orderId", checkAuth, OrdersController.orders_delete_order);

module.exports = router;
