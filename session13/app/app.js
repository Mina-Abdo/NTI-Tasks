const express = require("express")
const app = express()
const path = require("path")
const userRoutes = require("./routes/user.routes")

require("./database/connect")
app.use(express.urlencoded({extended:true}))
app.use(express.json())

app.use( userRoutes)



module.exports = app