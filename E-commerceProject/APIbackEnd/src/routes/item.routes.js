const itemController = require("../controller/item.controller")
const router = require("express").Router()
const authenticate = require("../middleware/auth.middleware")
const adminAuth = require("../middleware/admin.auth")
const upload = require("../middleware/fileUpload.middleware")

router.post("/create" , authenticate  , itemController.createItem)
router.post("/addItem/:id" , authenticate , itemController.addItem)
router.post("/admin/upImg/:id" , authenticate  , upload.single("itemImg"), itemController.upImg)
router.get("/getItemByCategory" , authenticate , itemController.getItemByCategory)
router.delete("/deleteCategoryItems" , authenticate  , itemController.deleteCategoryItems) 
router.delete("/deleteItemOwner/:id" , authenticate , itemController.deleteItemOwner)
router.patch("/editItem/admin/:id" , authenticate  , itemController.editItemByAdmin)
router.get("/all" , itemController.allItems)
router.get("/single/:id" , itemController.singleItem )


module.exports=router