const itemModel = require("../database/models/item.model")
const userModel = require("../database/models/user.model")
const mongoose = require("mongoose")

class Item{
    static createItem = async(req,res)=>{
        try{
            // const adminId= await userModel.find({_id:req.user._id})._id
            const adminId = "6309140ed425e3ffdb38af82"
            if(req.user._id!=adminId){throw new Error("user has no authority to create items")}
            const newItem = new itemModel({...req.body})
            newItem.save()
            res.send({apistatus:true, message:"Item created" , data:newItem})
        }
        catch(e){res.send({apistatus:false, data:e.message})}
    }
    static addItem = async(req,res)=>{
        try{
            const item = await itemModel.findById(req.params.id)
            const owner =(req.user._id)
            item.owners = item.owners.concat({owner})
            item.save()
            res.send({apistatus:true , message:"item added to user" , data:item})
        }
        catch(e){res.send({apistatus:false , data:e.message})}
    }
    static deleteItemOwner = async(req,res)=>{
        try{
            const item = await itemModel.findById(req.params.id)
            item.owners.filter(owner=> owner!=req.user._id)
            item.save()
            res.send({apistatus:true , message:"Item deleted for user" , data:item})
        }
        catch(e){res.send({apistatus:false , data:e.message})}
    }
    static upImg = async (req,res)=>{
        const adminId = "6308a9f9525fbab99f204b4f"
        try{
            if(req.user._id!=adminId){throw new Error("user is not allowed to add item image")}
            const item = await itemModel.findById(req.params.id)
            item.imgURL = req.file.filename
            item.save()
            res.send({apistatus:true , message:"image uploaded to item" , data:item})
    }
        catch(e){res.send({apistatus:false , data:e.message})}
    }
    static getItemByCategory = async(req,res)=>{
        try{
            const itemsByCategory = await itemModel.find({category:req.body.category})
            res.send({apistatus:true, message:"all items of category" , data:itemsByCategory})
        }
        catch(e){res.send({apistatus:false , data:e.message})}
    }
    static deleteCategoryItems = async(req,res)=>{
        try{
            const allItems = await itemModel.find()
            const filtered= allItems.filter(item=> item.category==req.body.category)
            filtered.forEach(async(item,index)=>{try{
                if(allItems.includes(item)) {const allItems =await itemModel.findByIdAndDelete(item._id)
                return allItems}}
                catch(e){res.send(e.message)}
            })
            allItems
            res.send({apistatus:true, message:"category and its items deleted" , data:allItems})
        }
        catch(e){res.send({apistatus:false , data:e.message})}
    }
    static editItemByAdmin = async(req,res)=>{
        const adminId = "6309140ed425e3ffdb38af82"
        try{
            if(req.user._id!=adminId) throw new Error("user has no authority")
            const item = await itemModel.findByIdAndUpdate(req.params.id,{...req.body} , {runValidators:true})
            item.save()
            res.send({apistatus:true , message:"item editted" , data:item})
        }
        catch(e){res.send({apistatus:false , data:e.message})}
    }
}
module.exports=Item