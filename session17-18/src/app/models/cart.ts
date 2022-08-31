import {ItemsForCart} from './items-for-cart'
export interface Cart {
    _id:string
    owner:string
    items:ItemsForCart[]
}
