const router = require("express").Router()
const userController = require("../controller/user.controller")
const authenticate = require("../middelware/auth.middleware")

router.post("/login" , userController.login)
router.post("/register" , userController.create)
router.get("/" , authenticate , userController.showAll)
router.get("/single" ,authenticate, userController.showSingle)
router.delete("/delete/:id",authenticate , userController.del)
router.put("/edit" ,authenticate, userController.edit)
router.post("/addAddr" ,authenticate, userController.addAddr)
router.put("/editAddr/:id" ,authenticate, userController.editAddr)
router.put("/balanceProccess" ,authenticate, userController.balanceProccess)
router.get("/logout/:id" ,authenticate, userController.logout)




module.exports = router