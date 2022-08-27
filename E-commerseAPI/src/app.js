const express = require("express")
const app = express()
const path = require("path")
const userRoutes = require("./routes/user.routes")
const itemRoutes = require("./routes/item.routes")
const cartRoutes = require("./routes/cart.routes")
const imageDir = `${__dirname}/images`

require("./database/connect")
app.use(express.urlencoded({extended:true}))
app.use(express.static(imageDir))
app.use(express.json())

app.use("/user", userRoutes)
app.use("/item", itemRoutes)
app.use("/cart" , cartRoutes)



module.exports = app