const mongoose = require("mongoose")
const jwt = require("jsonwebtoken")
const bcryptjs = require("bcryptjs")
const ObjectId = mongoose.Schema.Types.ObjectId
const itemSchema = mongoose.Schema({
    owners:[
        {
        owner:{
        type:ObjectId,
        ref:"User"
        }
    }],
    name:{
        type:String,
        trim:true,
        required:true,
        min:3,
        max:20
    },
    description:{
        type:String,
        required:true,
        trime:true,
        min:3,
        max:200
    },
    category:{
        type:String,
        trim:true,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    imgURL:{type:String},
},{timestamps:true})
//function to delete confedential data of user before sending it
itemSchema.methods.toJSON = function(){
    const deleted=["__v"]
    const itemData = this.toObject()
    deleted.forEach(d=> delete itemData[d])
    return itemData
}
const Item = mongoose.model("Item" , itemSchema)
module.exports=Item