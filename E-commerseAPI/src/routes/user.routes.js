const router = require("express").Router()
const userController = require("../controller/user.controller")
const authenticate = require("../middleware/auth.middleware")

router.post("/register" , userController.create)
router.post("/login" , userController.login)
router.get("/admin" , authenticate , userController.showAll) //not working properly
router.get("/profile" , authenticate, userController.profile)
router.delete("/delete" , authenticate , userController.deleteProfile)
router.delete("/admin/delete/:id" , authenticate , userController.adminDeleteProfile)
router.patch("/edit" , authenticate , userController.editProfile)
router.post("/addAddr" , authenticate , userController.addAddr)
router.patch("/editAddr/:id" , authenticate , userController.editAddr)
router.get("/logout" , authenticate , userController.logout)
router.get("/logoutAll" , authenticate , userController.logoutAll)

module.exports = router