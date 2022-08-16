import { preloader } from './section/preloader.js'
import { cart } from './section/cart.js'
import { keycontroller } from './keycontroller.js'


window.addEventListener('load', ()=>{
    //preloader()
})

document.addEventListener('DOMContentLoaded', () => {
    cart()
    keycontroller()
})
