const mongoose = require("mongoose")
const userModel = require("../database/models/user.model")


class User{
    static create = async(req,res)=>{
        try{
            const user = new userModel(req.body)
            await user.save()
            res.status(200).send({apistatus:true , message:"user rigestered" , data:user})
        }
        catch(e){res.status(500).send({apistatus:false , data:e.message})}
    }
    static login = async(req,res)=>{
        try{
            const userData = await userModel.login(req.body.username , req.body.password)
            const token = await userData.createLoginToken()
            res.status(200).send({apistatus:true , message:"user logged in" , data:{userData , token}})

        }
        catch(e){res.status(500).send({apistatus:false , message:"User not logged in" , data:e.message})}
    }
    static showAll = async(req,res)=>{
        try{
            // if(req.user.username!=req.admin.username){throw new Error("User has no admin authority")}
            const allUsers = await userModel.find()
            res.status(200).send({apistatus:true , message:"All users" , data:allUsers})
        }
        catch(e){res.status(500).send({apistatus:false , data:e.message})}
    }
    static profile = async(req,res)=>{
        try{
            res.status(200).send({apistatus:true , message:"user profile" , data:req.user})
        }
        catch(e){res.status(500).send({apistatus:false , data:e.message})}
    }
    static showUser = async(req,res)=>{
        try{
            if(req.admin){
            const user = await userModel.findById(req.params.id)
            res.status(200).send({apistatus:true , message:"user found" , data:user})
            }
            else {res.status(500).send({apistatus:false , message:"not admin"})}
        }
        catch(e){res.status(500).send({apistatus:false , data:e.message})}
    }
    static deleteProfile = async(req,res)=>{
        try{
            const user = await userModel.findByIdAndDelete(req.user._id)
            res.status(200).send({apistatus:true , message:"user deleted" , data:user})
        }
        catch(e){res.status(500).send({apistatus:false , data:e.message})}
    }
    static adminDeleteProfile = async (req,res)=>{
        try{
            // if(req.user.username != req.admin.username){throw new Error("user is not allowed to delete other users")}
            const user = await userModel.findByIdAndDelete(req.params.id)
            res.status(200).send({apistatus:true , message:"user deleted by admin" , data:user})
        }
        catch(e){res.status(500).send({apistatus:false , data:e.message})}
    }
    static editProfile = async (req,res)=>{
        try{
            const user = await userModel.findOneAndUpdate({_id:req.user._id} , req.body , {runValidators:true})
            await user.save()
            res.status(200).send({apistatus:true , message:"user profile edited" , data:user})
        }
        catch(e){res.status(500).send({apistatus:false , data:e.message})}
    }
    static addAddr = async(req,res)=>{
        try{
            req.user.addresses = req.user.addresses.concat(req.body)
            await req.user.save()
            res.status(200).send({apistatus:true , message:"userAddr added" , data:req.user})
        }
        catch(e){res.status(500).send({apistatus:false , data:e.message})}
    }
    static editAddr = async(req,res)=>{
        try{
            const addrIndex = req.user.addresses.findIndex(d=> d._id==req.params.id)
            req.user.addresses[addrIndex] = req.body
            req.user.save()
            res.status(200).send({apistatus:true , message:"Addr edited" , data:req.user})
        }
        catch(e){res.status(500).send({apistatus:false , data:e.message})}
    }
    static logout = async(req,res)=>{
        try{
            req.user.tokens = req.user.tokens.filter(t=> t.token!=req.header("Authentication"))
            req.user.save()
            res.status(200).send({apistatus:true , message:"user logged out" , data:req.user})
        }
        catch(e){res.status(500).send({apistatus:false , data:e.message})}
    }
    static logoutAll = async(req,res)=>{
        try{
            req.user.tokens=[]
            req.user.save()
            res.status(200).send({apistatus:true, message:"user logged out from all devices" , data:req.user})
        }
        catch(e){res.status(500).send({apistatus:false , data:e.message})}
    }
}

module.exports=User