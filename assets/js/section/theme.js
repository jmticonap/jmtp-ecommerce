export function theme(){
    if(!window.localStorage.getItem("dark_theme"))window.localStorage.setItem('dark_theme', 'false')
    const btn_theme = document.querySelector("#theme-button")
    const isDark = JSON.parse( window.localStorage.getItem("dark_theme"))
   
    function toDark(){
        btn_theme.classList.toggle('bx-sun')
        let isDark_ = false
        isDark_ = document.body.classList.toggle("dark_theme")
        window.localStorage.setItem("dark_theme", JSON.stringify(isDark_))
    }
    if(isDark) toDark()

    btn_theme.addEventListener('click', toDark)
    
}