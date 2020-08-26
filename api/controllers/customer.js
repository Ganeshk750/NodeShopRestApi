const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const key = require("../../setup/myurl").secret;
const Customer = require("../models/customer");

/* SIGNUP CUSTOMER*/
exports.customer_signup = (req, res, next) => {
  Customer.find({ email: req.body.email })
    .exec()
    .then((customer) => {
      if (customer.length >= 1) {
        res.status(409).json({
          message: "Customer allready exits our systems!",
        });
      } else {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          if (err) {
            res.status(500).json({
              error: err,
            });
          } else {
            const customer = new Customer({
              _id: mongoose.Types.ObjectId(),
              email: req.body.email,
              password: hash,
            });
            customer
              .save()
              .then((result) => {
                console.log(result);
                res.status(201).json({
                  message: "Customer created",
                });
              })
              .catch((err) => {
                console.log(err);
                res.status(500).json({
                  error: err,
                });
              });
          }
        });
      }
    });
};

/* CUSTOMER LOGIN*/
exports.customer_Login = (req, res, next) => {
  Customer.find({ email: req.body.email })
    .exec()
    .then((customer) => {
      if (customer.length < 1) {
        res.status(401).json({
          message: "login faield",
        });
      }
      bcrypt.compare(req.body.password, customer[0].password, (err, result) => {
        if (err) {
          res.status(401).json({
            message: "login faield",
          });
        }
        if (result) {
          const token = jwt.sign(
            {
              email: customer[0].email,
              customerId: customer[0]._id,
            },
            key,
            { expiresIn: "1h" }
          );
          res.status(200).json({
            message: "Login Successfull",
            token: token,
          });
        }
        res.status(401).json({
          message: "login faield",
        });
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
};

exports.customer_delete = (req, res, next) => {
  Customer.remove({ _id: req.params.customerId })
    .exec()
    .then((customer) => {
      res.status(200).json({
        message: "Customer deleted successfully",
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
};
