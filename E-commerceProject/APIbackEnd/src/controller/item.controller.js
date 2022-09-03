const itemModel = require("../database/models/item.model")
const userModel = require("../database/models/user.model")
const mongoose = require("mongoose")

class Item{
    static allItems=async(req,res)=>{
        try{
            const allItems = await itemModel.find()
            res.status(200).send({apistatus:true , data:allItems})
        }
        catch(e){res.status(500).send({apistatus:false , data:e.message})}
    }
    static singleItem = async(req,res)=>{
        try{
            const item = await itemModel.findById(req.params.id)
            res.status(200).send({apistatus:true , data:item})
        }
        catch(e){res.status(500).send({apistatus:false , data:e.message})}
    }
    static createItem = async(req,res)=>{
        try{
            // if(req.user.username!=req.admin.username){throw new Error("user has no authority to create items")}
            const newItem = new itemModel({...req.body})
            newItem.save()
            res.status(200).send({apistatus:true, message:"Item created" , data:newItem})
        }
        catch(e){res.status(500).send({apistatus:false, data:e.message})}
    }
    static addItem = async(req,res)=>{
        try{
            const item = await itemModel.findById(req.params.id)
            const owner =(req.user._id)
            item.owners = item.owners.concat({owner})
            item.save()
            res.status(200).send({apistatus:true , message:"item added to user" , data:item})
        }
        catch(e){res.status(500).send({apistatus:false , data:e.message})}
    }
    static deleteItemOwner = async(req,res)=>{
        try{
            const item = await itemModel.findById(req.params.id)
            item.owners.filter(owner=> owner!=req.user._id)
            item.save()
            res.status(200).send({apistatus:true , message:"Item deleted for user" , data:item})
        }
        catch(e){res.status(500).send({apistatus:false , data:e.message})}
    }
    static upImg = async (req,res)=>{
        try{
            const item = await itemModel.findById(req.params.id)
            item.imgURL = req.file.filename
            item.save()
            res.status(200).send({apistatus:true , message:"image uploaded to item" , data:item})
    }
        catch(e){res.status(500).send({apistatus:false , data:e.message})}
    }
    static getItemByCategory = async(req,res)=>{
        try{
            const itemsByCategory = await itemModel.find({category:req.body.category})
            res.status(200).send({apistatus:true, message:"all items of category" , data:itemsByCategory})
        }
        catch(e){res.status(500).send({apistatus:false , data:e.message})}
    }
    static deleteCategoryItems = async(req,res)=>{
        try{
            // if(req.user.username!=req.admin.username) {throw new Error("user has no authority")}
            const allItems = await itemModel.find()
            const filtered= allItems.filter(item=> item.category==req.body.category)
            filtered.forEach(async(item,index)=>{try{
                if(allItems.includes(item)) {const allItems =await itemModel.findByIdAndDelete(item._id)
                return allItems}}
                catch(e){res.status(500).send(e.message)}
            })
            // allItems
            res.status(200).send({apistatus:true, message:"category and its items deleted" , data:allItems})
        }
        catch(e){res.status(500).send({apistatus:false , data:e.message})}
    }
    static editItemByAdmin = async(req,res)=>{
        try{
            // if(req.user.username!=req.admin.username) throw new Error("user has no authority")
            const item = await itemModel.findByIdAndUpdate(req.params.id,{...req.body} , {runValidators:true})
            item.save()
            res.status(200).send({apistatus:true , message:"item editted" , data:item})
        }
        catch(e){res.status(500).send({apistatus:false , data:e.message})}
    }
}
module.exports=Item