const express = require("express")
const app = express()
const path = require("path")
const userRoutes = require("./routes/user.routes")
const blogRoutes = require("./routes/blog.routes")

require("./database/connect")
app.use(express.urlencoded({extended:true}))
app.use(express.json())

app.use("/user", userRoutes)
app.use("/blog", blogRoutes)



module.exports = app