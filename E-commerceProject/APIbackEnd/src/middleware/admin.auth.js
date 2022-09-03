const jwt = require("jsonwebtoken")
const userModel = require("../database/models/user.model")

const adminAuth = async (req,res,next)=>{
    try{
        const token = req.header("Authentication")
        const decoded = jwt.verify(token , process.env.JWTKEY)
        const admin = await userModel.findOne({_id:decoded._id , "tokens.token":token, type:"admin"})
        if(!admin) throw new Error("admin unauthenticated")
        req.admin = admin
        req.token = token
        next()
    }
    catch(e){res.send({apistatus:false , data:e.message})}
}
module.exports = adminAuth