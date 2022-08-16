export function cart() {
    const btnCartClose = document.querySelector("#cart-close")
    const shopCard = document.querySelector("#shop")
    const btnCartshop = document.querySelector("#btn-cart-shop")

    const header = document.querySelector('header')
    const main = document.querySelector('main')
    const footer = document.querySelector('footer')

    btnCartClose.addEventListener('click', (evt) => {
        shopCard.classList.remove("show-shop")
        header.classList.remove('modal-effect')
        main.classList.remove('modal-effect')
        footer.classList.remove('modal-effect')
    })
    btnCartshop.addEventListener('click', (evt) => {
        shopCard.classList.toggle("show-shop")
        header.classList.toggle('modal-effect')
        main.classList.toggle('modal-effect')
        footer.classList.toggle('modal-effect')
    })

    //TODO: Agregar efecto blur
}