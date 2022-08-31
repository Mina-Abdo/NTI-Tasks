import {Addresse} from './addresse'
export interface User {
    _id?:string
    name:string
    username:string
    password:string
    email:string
    userImage:string
    addresses?:Addresse[]
    tokens?:[
        {
            token:string
            _id?:string
        }
    ],
    createdAt?:string
    updatedAt?:string
} 

