const itemController = require("../controller/item.controller")
const router = require("express").Router()
const authenticate = require("../middleware/auth.middleware")
const upload = require("../middleware/fileUpload.middleware")

router.post("/create" , authenticate , itemController.createItem)//not working admin authentication
router.post("/addItem/:id" , authenticate , itemController.addItem)
router.post("/admin/upImg/:id" , authenticate , upload.single("itemImg"), itemController.upImg)
router.get("/getItemByCategory" , authenticate , itemController.getItemByCategory)
router.delete("/deleteCategoryItems" , authenticate , itemController.deleteCategoryItems) //not working
router.delete("/deleteItemOwner/:id" , authenticate , itemController.deleteItemOwner)
router.patch("/editItem/admin/:id" , authenticate , itemController.editItemByAdmin)


module.exports=router