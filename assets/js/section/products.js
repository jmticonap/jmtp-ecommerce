import { product_db } from '../data/products_db.js'
import { cartController, renderCart } from './cartController.js'

export const db = {
    items: window.localStorage.getItem('products') ? JSON.parse(window.localStorage.getItem('products')) : product_db,
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
        },
        productsByCategory: (category) => {
            return db.items
                .filter(itm => itm.category == category).length
        },
        quantityByCategory: (category) => {
            return db.items
                .filter(itm => itm.category == category)
                .reduce((a, b) => a + b.quantity, 0)
        }
    }
}

export function products() {
    //Pasamos un callBack en el argumento [0]
    const lst_products = loadProducts(arguments[0])
    if (!window.localStorage.getItem('products')) window.localStorage.setItem('products', [])
    const container = document.querySelector('#products__content')
    container.innerHTML = ''
    lst_products.forEach((itm, i) => {
        const str_html = `
        <article class="products__card hoodies">
            <div class="products__shape">
                <img src="${itm.image}" alt="Hoodies" class="products__img">
            </div>

            <div class="products__data">
                <h2 class="products__price">${itm.price} <span class="products__quantity">| Stock: ${itm.quantity}</span></h2>
                <h3 class="products__name">${itm.category}</h3>

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

export function filterControl() {
    const filter_list = document.querySelector('.article-selector__list')
    let filter_list_li = '';
    db.items
        .reduce((a, b) => a.add(b.category), new Set())
        .forEach(cat => {
            filter_list_li += `
        <li filtername="${cat}" class="article-selector__item">
            <h3>${cat}</h3>
            <span>${db.methods.productsByCategory(cat)} products</span>
        </li>`
        })
    filter_list.innerHTML += filter_list_li
    filterProducts()
}

function filterProducts() {
    const btns_list = document.querySelectorAll(".article-selector__list li")
    btns_list[0].addEventListener('click', ()=>{
        products()
    })
    btns_list.forEach((btn, i) => {
        if (i > 0) {
            btn.addEventListener('click', function(){
                console.log(this.getAttribute('filtername'))
                products({filterCallback: (itm)=> itm.category == this.getAttribute('filtername') })
            })
        }
    })
}

function loadProducts() {
    let local_products = JSON.parse(window.localStorage.getItem("products"))
    if (!local_products) window.localStorage.setItem("products", JSON.stringify(product_db))
    
    const result = JSON.parse(window.localStorage.getItem("products"))
    //Si hay un objecto se busca la propiedad 'filterCallback' para filtrar
    //los productos
    return arguments[0]? result.filter(arguments[0]['filterCallback']):result
}