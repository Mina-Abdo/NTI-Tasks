const deal = require("./dealWithJson")
const add = (argv)=>{
    const user={
        id:argv.id,
        name:argv.name,
        age:argv.age,
        details:argv.details
    }
    const allUsers = deal.readFromJson()
    allUsers.push(user)
    // console.log(allUsers);
    deal.writeToJson(allUsers)
}

const showAll = ()=>{
    console.log((deal.readFromJson()));
}

const showSingle = (id)=>{
    const allUsers= deal.readFromJson()
    const user = allUsers.find(user=> user.id==id);
    if(!user) return console.log("not found")
    console.log(`${user.id} - ${user.name} - ${user.age}`);
}

const deleteUser = (id)=>{
    const allUsers = deal.readFromJson()
    const userIndex = allUsers.findIndex(user=> user.id == id)
    allUsers.splice(userIndex , 1)
    deal.writeToJson(allUsers)
    console.log(allUsers);
}

module.exports = {add , showAll , showSingle , deleteUser}