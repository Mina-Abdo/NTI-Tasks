const mongoose = require("mongoose")
const blogChema = mongoose.Schema( {
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"User"
    },
    title:{
        type:String,
        trim:true,
        required:true,
        minlength:3,
        maxlength:20,
        lowercase:true
    },
    content:{
        type:String,
        trim:true,
        lowercase:true,
        required:true,

    },
} ,
{
    timestamps:true
})
const Blog = mongoose.model("Blog" , blogChema)
module.exports = Blog