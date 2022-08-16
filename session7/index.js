const express = require("express")
const app = express()
const port = 3000
const path = require("path")

const staticDir = path.join(__dirname , "static")
const viewsDir = path.join(__dirname , "frontend/views") // directory to put my frnt end in it
app.use(express.static(staticDir)) // to set express to use my static files
app.set("view engine" , "hbs") // to set hbs as my view engine
app.set("views" , viewsDir) // to set my views to special directory

// app.get("/" , (req,res)=>{
//     res.send("helo from express")
// })


app.get("/" , (req,res)=>{
    res.render("home")
})
app.get("/about" , (req,res)=>{
    res.render("about")
})
// app.get("/home" , (req,res)=>{
//     const fileLoc = `${__dirname}/home.html`
//     res.sendFile(fileLoc)
// })
app.listen(port , ()=> console.log(`we are on http://localhost:${port}`))