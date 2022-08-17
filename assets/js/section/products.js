import { product_db } from '../data/products_db.js'
import { cartController, renderCart } from './cartController.js'

export const db = {
    items: window.localStorage.getItem('products') ? JSON.parse(window.localStorage.getItem('products')) : items,
    methods: {
        find: (id) => {
            return db.items.find(item => item.id === id)
        },
        getAll: () => {
            return db.items
        },
        remove: (items) => {
            items.forEach(item => {
                const product = db.methods.find(item.id)
                product.quantity = product.quantity - item.quantity
            })
        }
    }
}

export function products() {
    const container = document.querySelector('#products__content')
    container.innerHTML = ''
    product_db.forEach((itm, i) => {
        const str_html = `
        <article class="products__card hoodies">
            <div class="products__shape">
                <img src="${itm.image}" alt="Hoodies" class="products__img">
            </div>

            <div class="products__data">
                <h2 class="products__price">${itm.price} <span class="products__quantity">| Stock: ${itm.quantity}</span></h2>
                <h3 class="products__name">Hoodies</h3>

                <button class="button products__button" data-id="${i + 1}">
                <i class="bx bx-plus"></i>
                </button>
            </div>
        </article>`
        container.innerHTML += str_html
    })

    const btns = document.querySelectorAll(".products__button")
    btns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const id = parseInt(btn.getAttribute('data-id'))
            const product = db.methods.find(id)

            if (product && product.quantity > 0) {
                cartController.methods.add(id, 1)
                renderCart()
            } else {
                window.alert('Sorry, we are out of stock')
            }
        })
    })
}

export function loadProducts() {
    let local_products = window.localStorage.getItem("products")
    if (!local_products) {
        window.localStorage.setItem("products", JSON.stringify(product_db))
        local_products = window.localStorage.getItem("products")
    }

}