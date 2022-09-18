const express = require("express");
const cartController= require("./../controllers/cartController");
const authController = require("./../controllers/authController");
const cartRouter = express.Router();
//routes
cartRouter
  .route("/product")
  .all(authController.protect)
  .get(cartController.getAllCarts)
  .post(cartController.addCart);
cartRouter
  .route("/product/:id")
  .all(authController.protect)
  .delete(cartController.deleteCartById);
cartRouter
  .route("/pay/:id")
  .all(authController.protect)
  .post(cartController.payCartById)


module.exports = cartRouter;
