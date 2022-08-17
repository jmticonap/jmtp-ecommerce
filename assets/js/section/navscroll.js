export function navscroll() {
    const header = document.querySelector("header")
    if (header) {
        window.addEventListener('scroll', () => {
            if(window.scrollY >= 50){
                header.style.backgroundColor = 'var(--body-color)'
            }else{
                header.style.backgroundColor = 'transparent'
            }
        })
    }
}