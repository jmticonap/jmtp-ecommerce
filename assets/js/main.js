import { preloader } from './section/preloader.js'
import { theme } from './section/theme.js'
import { nav } from './section/nav.js'
import { navscroll } from './section/navscroll.js'
import { cart, addItem } from './section/cart.js'
//import { keycontroller } from './keycontroller.js'
import { products, filterControl } from './section/products.js'


window.addEventListener('load', ()=>{
    preloader()
})

document.addEventListener('DOMContentLoaded', () => {
    theme()
    nav()
    navscroll()
    cart()
    //keycontroller()
    products()
    filterControl()
})
