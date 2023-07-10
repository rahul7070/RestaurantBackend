const express = require("express");
const restRouter = express.Router();
const restController = require("../controllers/restController")


restRouter.post("/restaurants/add",restController.add)
restRouter.get("/restaurants",restController.allrest)
restRouter.get("/restaurants/:id",restController.singleRest)
restRouter.get("/restaurants/:id/menu",restController.getmenu)
restRouter.put("/restaurants/:id/menu",restController.addmenu)
restRouter.delete("/restaurants/:id/menu/:itemid",restController.delMenu)



module.exports = {restRouter}