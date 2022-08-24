const mongoose = require("mongoose")
const bcryptjs = require("bcryptjs")
const validator = require("validator")
const jwt = require("jsonwebtoken")
const userSchema = mongoose.Schema( {
    name:{
        type:String,
        trim:true,
        required:true,
        minlength:3,
        maxlength:20,
        lowercase:true
    },
    username:{
        type:String,
        trim:true,
        unique:true,
        minlength:3,
        maxlength:20,
        required:true,

    },
    password:{
        type:String,
        trim:true,
        required:true,
        validate(value){
            if(value.includes("password") ||
            value.includes("123")||
            value.includes(this.name)) throw new Error("weak password")
        }
    },
    balance:{
        type:Number,
        required:true
    },
    
    adresses:{
        type:Boolean,
        default:false
    },
    addresses:[
        {
            addrType:{type:String, trim:true, required:true},
            addrDetails:{type:String, trim:true, required:true}
        }
    ],
    tokens:[
        {
            token:{
                type:String,
                required:true
            }
        }
    ],
} ,
{
    timestamps:true
})
userSchema.methods.toJSON = function(){
    const deleted = ["__v" , "password"]
    const userData = this.toObject()
    deleted.forEach(d=> delete userData[d])
    return userData
}
userSchema.pre("save" , async function(){
    const userData = this
    if(userData.isModified("password")) {
        userData.password = await bcryptjs.hash(userData.password , 10)
    }
})
userSchema.statics.login = async (username , password)=>{
    const userData = await User.findOne({username})
    if(!userData) throw new Error("invalid username")
    const matched = await bcryptjs.compare(password , userData.password)
    if(!matched) throw new Error("wrong password")
    return userData
}
userSchema.methods.createLoginToken = async function(){
    const user = this
    const token = jwt.sign({_id:user._id} , process.env.JWTKEY)
    user.tokens = user.tokens.concat({token})
    await user.save()
    return token
}
const User = mongoose.model("User" , userSchema)
module.exports = User