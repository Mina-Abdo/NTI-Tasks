const mongoose = require("mongoose")
const validator = require("validator")
const jwt = require("jsonwebtoken")
const bcryptjs = require("bcryptjs")
const userSchema = mongoose.Schema( {
    name:{
        type:String,
        trim:true,
        required:true,
        minlength:3,
        maxlength:20,
        lowercase:true
    },
    type:{
        type:String,
        trim:true,
        required:true,
        default:"user"
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
            if(value.toLowerCase().includes("password") ||
            value.includes("123")||
            value.includes(this.name)) throw new Error("weak password")
        }
    },
    email:{
        type:String,
        required:true,
        trim:true,
        validate(value){
            if(!validator.isEmail(value)) throw new Error("invalid email")
        }
    },
    userImage:{
        type:String
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

//function to delete confedential data of user before sending it
userSchema.methods.toJSON = function(){
    const deleted=["__v" , "password"]
    const userData = this.toObject()
    deleted.forEach(d=> delete userData[d])
    return userData
}

//function to hash password before saving user
userSchema.pre("save" , async function(){
    const userData = this
    if(userData.isModified("password")){
        userData.password = await bcryptjs.hash(userData.password , 10)
    }

})

//function to verify user password before login
userSchema.statics.login = async (username , password)=>{
    const userData = await User.findOne({username})
    if(!userData) throw new Error("invalid username")
    const matched = await bcryptjs.compare(password , userData.password)
    if(!matched) throw new Error("invalid password")
    return userData
}

//function to create login token for user login
userSchema.methods.createLoginToken= async function(){
    const user = this
    const token = jwt.sign({_id:user._id} , process.env.JWTKEY)
    user.tokens = user.tokens.concat({token})
    await user.save()
    return token
}

const User = mongoose.model("User" , userSchema)
module.exports = User