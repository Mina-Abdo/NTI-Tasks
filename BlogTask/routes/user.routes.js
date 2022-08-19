const router = require("express").Router()
const userController = require("../controller/user.controller")

router.get("/" , userController.all)

router.get("/add" , userController.add)
router.post("/add" , userController.addLogic)
router.get("/addcomment/:id" , userController.addComment)
router.post("/addcomment/:id" , userController.addCommentLogic)
router.get("/single/:id" , userController.single)
// router.get("/del/:id" , userController.del)


module.exports = router