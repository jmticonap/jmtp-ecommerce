import { preloader } from './section/preloader.js'
import { cart, addItem } from './section/cart.js'
import { keycontroller } from './keycontroller.js'
import { products, loadProducts } from './section/products.js'


window.addEventListener('load', ()=>{
    //preloader()
})

document.addEventListener('DOMContentLoaded', () => {
    cart()
    keycontroller()
    products()
    //Cargando productos en el localstorage
    loadProducts()
    addItem(1)
})
