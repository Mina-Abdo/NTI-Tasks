const fs = require("fs")
class Deal{
    static readFromJson = ()=>{
        let data 
        try{
            data = JSON.parse(fs.readFileSync("data.json"))
        }
        catch(e){
            data = []
        }
        return data
    }
    static writeToJSON = (data)=>{
        fs.writeFileSync("data.json", JSON.stringify(data))
    }
    static getIndex = (allCustomers , val , key)=>{
        const index = allCustomers.findIndex(customer=> customer[key] == val)
        return index
    }
}


module.exports = Deal