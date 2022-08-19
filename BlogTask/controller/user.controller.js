const connection = require("../database/connect")
const {ObjectId} = require("mongodb")
const getIndex = (allCustomers , val , key)=>{
    const index = allCustomers.findIndex(customer=> customer[key] == val)
    return index
}
class User{
    static all =  (req,res)=>{
        connection((err , db)=>{
            db.collection("articles").find()
            .toArray((e , users)=>{
                if(e) return res.render("error404")
                res.render("all" , 
                {
                    pageTitle:"Blog Home" ,
                    users
                })
            })
        })
        
    }
    static add = (req,res)=>{
        res.render("add" , {pageTitle:"Add an  article"})
    }
    static addLogic = (req,res)=>{
        let errors = {} , hasError=false
        if(!req.body.title){
            errors.title = "please enter name"
            hasError = true
        }
        if(!req.body.content){
            errors.content = "please enter email"
            hasError = true
        }
        if(hasError) return res.render("add" , {data:req.body , errors})
        connection((err , db)=>{
            db.collection("articles").insertOne({article:req.body , comments:[]})
            .then(()=>res.redirect("/"))
            .catch(e=> res.render("error404"))
        })
    }
    static single = (req,res)=>{
        const userId = req.params.id
        connection((err , db)=>{
            if(err) return res.render("error404")
            db.collection("articles").findOne({_id:new ObjectId(userId)})
            .then(user=>{
                res.render("single" , {
                    pageTitle:"Single article" , user
                })
            })
            .catch(e=> res.send(e.message))
        })
       
    }
    static addComment = (req,res)=>{
        res.render("addcomment" , {pageTitle:"Add a comment"})

        }
    static addCommentLogic = (req,res)=>{
        const userId = req.params.id
        connection((err , db)=>{
            if(err) res.render("error404")
                const article = db.collection("articles").updateOne(
                    { _id : new ObjectId(userId) } , {$push:{comments:req.body}} )
                
                .then((r)=>{ 
                    res.redirect(`/single/${userId}`)})
                .catch(e=> res.send(e.message))
            
        })
    }
    // static del = (req,res)=>{
    //     const userId = req.params.id
    //     connection((err , db)=>{
    //         if(err) res.render("error404")
    //         db.collection("users").findOneAndDelete({_id:new ObjectId(userId)})
    //         .then(users=>{
    //             console.log(users);
    //             res.redirect("/" )
                
    //         })
    //         .catch(e=> res.send(e.message))
    //     })
        
    

    // }
}

module.exports = User