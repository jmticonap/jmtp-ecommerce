export function nav(){
    const btn_toggle = document.querySelector('#nav-toggle')
    const btn_close_menu = document.querySelector('#nav-close')
    const menu = document.querySelector('#nav-menu')

    btn_toggle.addEventListener('click', () => {
        menu.classList.toggle('show-menu')
    })
    btn_close_menu.addEventListener('click', () => {
        menu.classList.remove('show-menu')
    })
}