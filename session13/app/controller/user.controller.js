const userModel = require("../database/models/user.model")

class User{
    
    static create = async(req,res)=>{
        try{
            const userData = new userModel(req.body)
            await userData.save()
            res.send({
                apistatus:true,
                message:"user registered",
                data:userData
            })
        }
        catch(e){
            res.send({
                apistatus:false,
                message:e.message
            })
        }
    }
    static showAll = async(req,res)=>{
        try{
            const allUsers = await userModel.find()
            
            
            res.send({
                apistatus:true, message:"all users" , data:allUsers
            })
        }
        catch(e){res.send({apistatus:false, data:e.message})}
    }
    static showSingle = async(req,res)=>{
        try{
            res.send({
                apistatus:true, message:"all users" , data:req.user
            })
        }
        catch(e){res.send({apistatus:false, data:e.message})}
    }
    static del = async(req,res)=>{
        try{
            const userId = req.params.id
            const user = await userModel.findByIdAndRemove(userId)
            res.send({
                apistatus:true, message:"all users" , data:user})
        }
        catch(e){res.send({apistatus:false, data:e.message})}
    }
    static edit = async(req,res)=>{
        try{
            const user = req.user
            for(let prop in req.body){
                user[prop] = req.body[prop]
            }
            await user.save()
            res.send({apistatus:true, message:"Edited user", data:user})
        }
        catch(e){res.send({apistatus:false, data:e.message})}
    }
    static addAddr = async(req,res)=>{
        try{
            const user = req.user
            user.addresses.push(req.body.address)
            await user.save()
            res.send({apistatus:true, message:"Edited user", data:user})
        }
        catch(e){res.send({apistatus:false, data:e.message})}
    }
    static editAddr = async(req,res)=>{
        try{
            const addrIndex =  req.user.addresses.findIndex(d=> d._id==req.params.id)
            req.user.addresses[addrIndex] = req.body.address
            await req.user.save()
            res.send({apistatus:true, message:"Added address", data:req.user})
        }
        catch(e){res.send({apistatus:false, data:e.message})}
    }
    static login = async(req , res)=>{
        try{
            const userData = await userModel.login(req.body.username , req.body.password)
            const token = await userData.createLoginToken()
            res.send({apistatus:true, message:"Edited address", data:{userData , token}})
        }
        catch(e){
            res.send({apistatus:false, data:e.message})
        }
        
    }
    static balanceProccess = async (req,res)=>{
        try{
            const balanceOperation = req.body.operation
            if(!balanceOperation) throw new Error("Balance operation is not specified")
            if(balanceOperation == "withdraw"){req.user.balance = req.user.balance - req.body.operationBalance}
            else {req.user.balance = req.user.balance + req.body.operationBalance}
            await req.user.save()
        }
        catch(e){res.send({apistatus:false, data:e.message})}
        res.send({apistatus:true, message:"Edited balance", data:req.user})
    }

}

module.exports = User