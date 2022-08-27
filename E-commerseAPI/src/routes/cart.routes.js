const cartController = require("../controller/cart.controller")
const router = require("express").Router()
const authenticate = require("../middleware/auth.middleware")

router.post("/create" , authenticate , cartController.create)

module.exports=router