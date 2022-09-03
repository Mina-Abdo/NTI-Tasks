const cartController = require("../controller/cart.controller")
const router = require("express").Router()
const authenticate = require("../middleware/auth.middleware")

// router.post("/create" , authenticate , cartController.create)
router.post("/addItem" , authenticate , cartController.addItemToCart)
router.get("/getCart" , authenticate , cartController.getCart)
router.post("/deleteItem" , authenticate , cartController.deleteItemFromCart)
router.patch("/updateItemQuantity" , authenticate , cartController.increaseItemQuantity)

module.exports=router