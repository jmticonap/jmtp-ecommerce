import { product_db } from '../data/products_db.js'

export function products(){
    const container = document.querySelector('#products__content')
    container.innerHTML = ''
    product_db.forEach(itm => {
        const str_html = `
        <article class="products__card hoodies">
            <div class="products__shape">
                <img src="${itm.image}" alt="Hoodies" class="products__img">
            </div>

            <div class="products__data">
                <h2 class="products__price">${itm.price} <span class="products__quantity">| Stock: ${itm.quantity}</span></h2>
                <h3 class="products__name">Hoodies</h3>

                <button class="button products__button" data-id="1">
                <i class="bx bx-plus"></i>
                </button>
            </div>
        </article>`
        container.innerHTML += str_html
    })

}