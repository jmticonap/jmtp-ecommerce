export function preloader() {
    const preloader = document.querySelector("#preloader")
    setTimeout(()=>{
        preloader.style.display = 'none'
    },3000)
}