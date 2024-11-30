let burgerIcon = document.querySelector(".burger-menu_container");
let menu = document.querySelector(".mobile-menu");
let body = document.querySelector("body");
let footer = document.querySelector("footer");
let burgerNavigationLinks = document.querySelectorAll('.navigation_link.mobile');


burgerIcon.onclick = function (e) {
    toggleMenu();
}

function toggleMenu() {
    burgerIcon.classList.toggle('clicked');
    menu.classList.toggle('clicked');
    body.classList.toggle('clicked');
}

burgerNavigationLinks.forEach(link => {
    link.onclick = function (e) {
        let linkPath = this.getAttribute('href');

        if (linkPath != null && linkPath.startsWith('#')) {
            e.preventDefault();
            toggleMenu();
            setTimeout(() => {
                document.querySelector(linkPath).scrollIntoView({ behavior: 'smooth' });
            }, 300);
        }
        else if (linkPath == null) {
            toggleMenu();
        }
        else {
            e.preventDefault();
            toggleMenu();
            setTimeout(() => {
                window.location.href = linkPath;
            }, 300);
        }
    }
});

