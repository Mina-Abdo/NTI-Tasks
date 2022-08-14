const fs = require("fs")
const readFromJson = ()=>{
    let data
    try{
        data = JSON.parse(fs.readFileSync("data.json"))
    }
    catch(e){
        data = []
    }
    return data
}

const writeToJson = (data)=>{
        data = fs.writeFileSync("data.json" , JSON.stringify(data))
}

module.exports = {writeToJson , readFromJson}
