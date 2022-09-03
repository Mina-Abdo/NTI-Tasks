const userModel = require("../database/models/user.model")
const itemModel = require("../database/models/item.model")
const cartModel = require("../database/models/cart.model")

class Cart{
    // static create = async(req,res)=>{
    //     try{
    //         const cart = new cartModel({...req.body , owner:req.user._id})
    //         cart.save()
    //         res.status().send({apistatus:true , message:"cart created" , data:cart})
    //     }
    //     catch(e){res.status().send({apistatus:false , data:e.message})}
    // }
    static addItemToCart = async(req,res)=>{
        try{
            const owner = req.user._id
            const itemId= req.body.itemId
            const quantity = req.body.quantity
            const cart = await cartModel.findOne({owner})
            const item = await itemModel.findOne({_id:itemId})
            // console.log({_id:itemId})
            // console.log(item)
            if(!item){
                res.status(500).send({message:"item not found" })
                return
            }
            const name = item.name
            const price = item.price
            if(cart){
                const itemIndex = cart.items.findIndex(item=>item.itemId==itemId)
                //check if an item exisits in cart or not
                if(itemIndex>-1){
                    let product = cart.items[itemIndex]
                    product.quantity = +product.quantity + +quantity
                    product.category = item.category
                    cart.items[itemIndex] = product
                    // console.log(product)
                    await cart.save()
                    // console.log(cart);
                    res.status(200).send({apistatus:true , message:"item quantity added", data:cart})
                }
                else{
                    cart.items.push({itemId:item._id , name:item.name , quantity:item.quantity , price:item.price , category:item.category , imgURL:item.imgURL })
                    await cart.save()
                    console.log(cart);
                    res.status(200).send({apistatus:true , message:"item added" , data:cart})
                }
            }
            else{

                const newCart = new cartModel({owner:req.user._id , items:[{itemId:item._id , name:item.name , quantity:item.quantity , price:item.price , category:item.category , imgURL:item.imgURL}]})
                newCart.save()
                res.status(200).send({apistatus:true , message:"cart created and item added" , data:newCart})
            }
            
        }
        catch(e){res.status(500).send({apistatus:false , data:e.message})}
    }
    static getCart = async(req,res)=>{
        try{
            const cart = await cartModel.findOne({owner:req.user._id})
            res.send(cart)
            // if(cart &&cart.items.length>0){ res.status(200).send({apistatus:true , message:"cart already exisits" , data:cart})}
            // else {res.status(500).send({message:"no cart found"})}
            // res.status(200).send({apistatus:true , message:"cart for user" , data:cart})

        }
        catch(e){res.status(500).send({apistatus:false , data:e.message})}
    }
    static deleteItemFromCart = async(req,res)=>{
        const itemId = req.body.itemId
        try{
            let cart = await cartModel.findOne({owner:req.user._id})
            const itemIndex = cart.items.findIndex(item=>item.itemId==itemId)
            if(itemIndex>-1){
                let item = cart.items[itemIndex]
                if(req.body.quantity<item.quantity) {
                    item.quantity = +item.quantity - +req.body.quantity
                    cart = await cart.save()
                }
                else{
                cart.items.splice(itemIndex , 1)
                cart = await cart.save()
                }
            }
            res.status(200).send({apistatus:true , data:cart})
        }
        catch(e){res.status(500).send({apistatus:false , data:e.message})}
    }
    static increaseItemQuantity = async(req,res)=>{
        try{
            const cart = await cartModel.findOne({owner:req.user._id})
            const item = await itemModel.findOne({itemId:req.body.itemId})
            if(!item){
                res.status(500).send({message:"item not found" })
                return
            }
            if(cart){
                const itemIndex = cart.items.findIndex(item=>item.itemId==req.body.itemId)
                    cart.items[itemIndex].quantity = +cart.items[itemIndex].quantity + +req.body.quantity
                    // console.log(product)
                    await cart.save()
                    // console.log(cart);
                    res.status(200).send({apistatus:true , message:"item quantity added", data:cart})
                
            }
        
            
    }
    catch(e){res.status(500).send({apistatus:false , data:e.message})}

}
}
module.exports=Cart