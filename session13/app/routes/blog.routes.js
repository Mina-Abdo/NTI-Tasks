const router = require("express").Router()
const blogController = require("../controller/blog.controller")
const authenticate = require("../middelware/auth.middleware")


router.get("/" , blogController.showAll)
router.post("/add" ,authenticate, blogController.create)
router.get("/showmyblogs" , authenticate , blogController.myBlogs)
router.get("/single/:id" , authenticate , blogController.showSingle)
router.delete("/single/:id", authenticate , blogController.del)
router.patch("/single/:id" , blogController.edit)




module.exports = router