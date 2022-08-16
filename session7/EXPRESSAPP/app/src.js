const { hasSubscribers } = require("diagnostics_channel")
const express = require("express")
const app = express()
const path= require("path")
const hbs = require("hbs")


app.use(express.static(path.join(__dirname , "../frontend/static")))
app.set("view engine" , "hbs") 
app.set("views" , path.join(__dirname , "../frontend/views") )
hbs.registerPartials(path.join(__dirname , "../frontend/layouts"))


app.get("/add" , (req,res)=>{
    res.render("add" , {
        pageTitle:"Add new use",
        pageContent:"add"
    })
})

app.get("/edit/:id" , (req,res)=>{
    const user = {name:"mina" , age:30 , email:"mina@gmail.com"}
    res.render("edit" , {
        pageTitle:"Edit use",
        user
    })
})



app.get("/" , (req,res)=>{
    res.render("showall" , {
        pageTitle:"Home page",
        pageContent:"all"
    })
})
app.get("/showsingle/:id" , (req,res)=>{
    res.render("showsingle" , {
        pageTitle:"show one use"    })
})
app.all("*" , (req,res)=>{
    res.render("error404", {
        pageTitle:"Error 404",
        
    })
})

module.exports = app