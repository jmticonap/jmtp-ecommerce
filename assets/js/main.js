import { preloader } from './section/preloader.js'
import { cart, addItem } from './section/cart.js'
//import { keycontroller } from './keycontroller.js'
import { products, filterControl } from './section/products.js'
import { theme } from './section/theme.js'
import { navscroll } from './section/navscroll.js'


window.addEventListener('load', ()=>{
    preloader()
})

document.addEventListener('DOMContentLoaded', () => {
    theme()
    navscroll()
    cart()
    //keycontroller()
    products()
    filterControl()
})
