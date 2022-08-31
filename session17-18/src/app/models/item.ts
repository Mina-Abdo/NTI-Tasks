export interface Item {
    _id?:string
    owners?:[
        {
        owner:string
    }],
    name:string
    description:string
    category:string
    price:number
    imgURL?:string
}

