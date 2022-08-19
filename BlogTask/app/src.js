const express = require("express")
const app = express()
const path = require("path")
const hbs = require("hbs")
const userRoutes = require("../routes/user.routes")

app.use(express.urlencoded({extended:true}))
app.use(express.static(path.join(__dirname , "../public/static")))
app.set("view engine" , "hbs")
app.set("views" , path.join(__dirname , "../public/views"))
hbs.registerPartials(path.join(__dirname , "../public/layouts"))

app.use(userRoutes)

app.get("*" , (req,res)=>{
    res.render("error404" , {paggeTitle:"Error 404"})
})

module.exports = app