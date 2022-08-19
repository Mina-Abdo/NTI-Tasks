const {MongoClient} = require("mongodb")
const dbURL = "mongodb://localhost:27017"

    const myConnection = (cb)=>{
        MongoClient.connect(dbURL , {} , (err , client)=>{
            if(err) {
                return cb(err , false)
            }
            const connection = client.db("blogTask")
            cb(false , connection)
        })
    }
    module.exports = myConnection
