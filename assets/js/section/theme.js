export function theme(){
    const btn_theme = document.querySelector("#theme-button")
    btn_theme.addEventListener('click', () => {
        btn_theme.classList.toggle('bx-sun')
        document.body.classList.toggle("dark_theme")
    })
}