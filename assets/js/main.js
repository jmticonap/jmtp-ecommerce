import { preloader } from './section/preloader.js'
import { cart } from './section/cart.js'
import { keycontroller } from './keycontroller.js'
import { products } from './section/products.js'


window.addEventListener('load', ()=>{
    //preloader()
})

document.addEventListener('DOMContentLoaded', () => {
    cart()
    keycontroller()
    products()
})
