export function cart() {
    const btnCartClose = document.querySelector("#cart-close")
    const shopCard = document.querySelector("#shop")
    const btnCartshop = document.querySelector("#btn-cart-shop")

    btnCartClose.addEventListener('click', (evt) => {
        shopCard.classList.remove("show-shop")
    })
    btnCartshop.addEventListener('click', (evt) => {
        shopCard.classList.toggle("show-shop")
    })

    //TODO: Agregar efecto blur
}