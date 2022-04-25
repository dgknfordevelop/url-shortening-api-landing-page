let toggleButton = document.querySelector(".Hamburger")
let mobileNav = document.querySelector(".Mobile-nav-section")

toggleButton.addEventListener('click', toggleSideNav)

function toggleSideNav() {
    mobileNav.classList.toggle("hidden")
}

function windowSize(){
    let windowInnerWidth = window.innerWidth;
    if(windowInnerWidth > 768){
        mobileNav.classList.add("hidden")
    }
    if(windowInnerWidth < 768){
        toggleButton.classList.remove("hidden")
    }
}
window.addEventListener("resize", windowSize)


