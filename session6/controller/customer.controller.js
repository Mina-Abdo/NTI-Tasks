const deal = require("./deal.controller")

class Customer {
    static addCustomer= (argv)=>{
        const customer = {
            accuNum:argv.accuNum,
            userName:argv.userName ,
            name:argv.name ,
            initialBalance:argv.initialBalance ,
            remainingBalance:argv.initialBalance,
            transactions:argv.transactions,
        }
        const allCustomers= deal.readFromJson()
        allCustomers.every((el , index , arr) =>{
            if(el.userName!=customer.userName) allCustomers.push(customer)
            else return console.log("customerName used before"); 
        })
        // const index = deal.getIndex(allCustomers , customer.userName , "userName")
        // if(index!=-1) console.log("customerName used before")
        
        deal.writeToJSON(allCustomers)
    }
    static editCustomer=(argv)=>{
        try{
            const allCustomers = deal.readFromJson()
            const index = deal.getIndex(allCustomers , argv.id , "accuNum")
            const customer = {
                userName:argv.userName ,
                name:argv.name ,
                transactions:[],
            }
            if(index == -1) return console.log("Customer not found");
            const hasUserName = deal.getIndex(allCustomers , customer.userName , "userName")
            if(hasUserName!=-1 && hasUserName!=index){
                return console.log("used before");
            }
            for(const prop in customer){
                allCustomers[index][prop] = customer[prop]
            }
            
            deal.writeToJSON(allCustomers)
    
        }
        catch(e){console.log(e.message)}

    }
    static addTransaction=(argv)=>{
        const allCustomers = deal.readFromJson()
        const index = deal.getIndex(allCustomers , argv.id , "accuNum")
        if(argv.transType == "withdraw") {
            allCustomers[index].remainingBalance = allCustomers[index].remainingBalance - argv.transBalance
        }
        else allCustomers[index].remainingBalance = allCustomers[index].remainingBalance +argv.transBalance
        const trans = {
            transactionId:Date.now(),
            transactionType:argv.transType,
            transactionBalance:argv.transBalance
        }
        allCustomers[index].transactions.push(trans)
        
        console.log(allCustomers[index].remainingBalance)
        deal.writeToJSON(allCustomers)


    }
    static rollBackTransaction=(argv)=>{
        const allCustomers = deal.readFromJson()
        // console.log(argv.customerId)
        const index = deal.getIndex(allCustomers , argv.customerId , "accuNum")
        const transIndex = deal.getIndex(allCustomers[index].transactions , argv.transId , "transactionId")
        if(transIndex!=-1){
        if(allCustomers[index].transactions[transIndex].transactionType == "withdraw") {
            allCustomers[index].remainingBalance = allCustomers[index].remainingBalance 
            + allCustomers[index].transactions[transIndex].transactionBalance
        }
        else  {
            allCustomers[index].remainingBalance = allCustomers[index].remainingBalance 
            - allCustomers[index].transactions[transIndex].transactionBalance
        }
        allCustomers[index].transactions.splice( transIndex, 1)

        deal.writeToJSON(allCustomers)
        }   
        else return console.log("transaction not found");     
        
    }
    static delCustomer=(id)=>{
        const allCustomers = deal.readFromJson()
        const index = deal.getIndex(allCustomers , id , "accuNum")
        if(!index) return console.log("not found");
        allCustomers.splice(index , 1)
        deal.writeToJSON(allCustomers)

    }
    static showCustomer=(argv)=>{
        const allCustomers = deal.readFromJson()
        const index = deal.getIndex(allCustomers , argv.id , "accuNum")
        if(index==-1) return console.log("not found");
        console.log(`
        userName : ${allCustomers[index].userName} -  name : ${allCustomers[index].name} - initial balance : ${allCustomers[index].initialBalance} -
        Remaining balance : ${allCustomers[index].remainingBalance}`)
        allCustomers[index].transactions.forEach(trans=> console.log(`
        trans ID - ${trans.transactionId} - trans Type - ${trans.transactionType} - trans amount - ${trans.transactionBalance}`))

    }
    static allCustomers=()=>{
        const allCustomers = deal.readFromJson()
        allCustomers.forEach(customer=>{
        console.log(`${customer.accuNum} - ${customer.userName} - ${customer.name} - ${customer.initialBalance} -${customer.remainingBalance}`);
    })

    }    
}

module.exports=Customer