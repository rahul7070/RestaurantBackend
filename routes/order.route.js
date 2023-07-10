const express = require("express");
const orderRouter = express.Router();
const orderController = require("../controllers/orderController")


orderRouter.post("/orders",orderController.addOrder)
orderRouter.get("/orders/:id",orderController.getOrder)
orderRouter.patch("/orders/:id",orderController.updateOrder)



module.exports = {orderRouter}