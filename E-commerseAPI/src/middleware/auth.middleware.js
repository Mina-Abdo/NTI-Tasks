const jwt = require("jsonwebtoken")
const userModel = require("../database/models/user.model")

const authenticate = async (req,res,next)=>{
    try{
        const token = req.header("Authentication")
        const decoded = jwt.verify(token , process.env.JWTKEY)
        const user = await userModel.findOne({_id:decoded._id , "tokens.token":token})
        if(!user) throw new Error("user unauthenticated")
        req.user = user
        req.token = token
        next()
    }
    catch(e){res.send({apistatus:false , data:e.message})}
}
module.exports = authenticate