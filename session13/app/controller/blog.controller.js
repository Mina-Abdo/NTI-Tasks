const blogModel = require("../database/models/blog.model")
class Blog{

    static create = async(req,res)=>{
        try{
            const blogData = new blogModel({userId:req.user._id , ...req.body})
            await blogData.save()
            res.send({
                apistatus:true,
                message:"blog registered",
                data:blogData
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
            const allBlogs = await blogModel.find()
            res.send({
                apistatus:true, message:"all users" , data:allBlogs
            })
        }
        catch(e){res.send({apistatus:false, data:e.message})}
    }
    static showSingle = async(req,res)=>{
        try{
            const blogId = req.params.id
            const blog = await blogModel.findById(blogId)
            res.send({
                apistatus:true, message:"all users" , data:blog
            })
        }
        catch(e){res.send({apistatus:false, data:e.message})}
    }
    static del = async(req,res)=>{
        try{
            const userId = req.params.id
            const user = await blogModel.findByIdAndRemove(userId)
            res.send({
                apistatus:true, message:"blog deleted" , data:user})
        }
        catch(e){res.send({apistatus:false, data:e.message})}
    }
    static edit = async(req,res)=>{
        try{
            const blog = await blogModel.findById(req.params.id)
            for(let prop in req.body){
                blog[prop] = req.body[prop]
            }
            await blog.save()
            res.send({apistatus:true, message:"Edited blog", data:blog})
        }
        catch(e){res.send({apistatus:false, data:e.message})}
    }
    static myBlogs = async(req,res)=>{
        try{
            const allBlogs = await blogModel.find({userId:req.user._id})
            res.send({apistatus:true , message:"My blogs" , data:allBlogs})
        }
        catch(e){res.send({apistatus:false, data:e.message})}
    }
}
module.exports = Blog

