const Customer = require("./controller/customer.controller")
const yargs = require("yargs")
yargs.command({
    command:"add",
    builder:{
        accuNum:{
            type:'String',
            default:Date.now()
        } ,
        userName:{
            type:"String",
            demandOption:true
        } ,
        name:{
            type:"string" ,
            demandOption:true
        } ,
        initialBalance:{
            type:"Number" ,
            demandOption:true
        } ,

        transactions:{
            type:"Array" ,
            default:[]
        } ,

    },
    handler:(argv)=>Customer.addCustomer(argv)
})
yargs.command({
    command:"edit",
    builder:{
        id:{
        demandOption:true,
    },},
    handler:(argv)=>Customer.editCustomer(argv)
})
yargs.command({
    command:"del",
    builder:{
        id:{
        demandOption:true,
    },},
    handler:(argv)=>Customer.delCustomer(argv.id)
})
yargs.command({
    command:"showAll",
    handler:()=>Customer.allCustomers()
})
yargs.command({
    command:"showSingle",
    builder:{
        id:{
            demandOption:true,
        },
    },
    handler:(argv)=>Customer.showCustomer(argv)
})
yargs.command({
    command:"addTransaction",
    builder:{
        id:{demandOption:true},
        transType:{
            type:"Strig",
            demandOption:true
        } ,
        transBalance:{demandOption:true}
    },
    handler:(argv)=>Customer.addTransaction(argv)
})
yargs.command({
    command:"rollback",
    builder:{
        customerId:{demandOption:true},
        transId:{demandOption:true},
    },
    handler:(argv)=>Customer.rollBackTransaction(argv)
})
yargs.argv