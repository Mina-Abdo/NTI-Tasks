const mongoose = require("mongoose")
const ObjectId = mongoose.Schema.Types.ObjectId
const cartSchema = mongoose.Schema({
    owner:{
        type:ObjectId,
        required:true,
        ref:"User"
    },
    items:[{
        itemId:{
            type:ObjectId,
            ref:"Item",
            required:true
        },
        name:{type:String , trim:true},
        category:{type:String , trim:true},
        quantity:{type:Number , required:true , min:1 , default:1},
        price:{type:Number},
        imgURL:{type:String}
    }],
    // bill:{
    //     type:Number,
    //     required:true,
    //     default:0
    // },
},{timestamps:true})
const Cart = mongoose.model("Cart" , cartSchema)
module.exports=Cart