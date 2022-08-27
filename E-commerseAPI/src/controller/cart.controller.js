const userModel = require("../database/models/user.model")
const itemModel = require("../database/models/item.model")
const cartModel = require("../database/models/cart.model")

class Cart{
    static create = async(req,res)=>{
        try{
            res.send(hello)
        }
        catch(e){res.send({apistatus:false , data:e.message})}
    }
}
module.exports=Cart