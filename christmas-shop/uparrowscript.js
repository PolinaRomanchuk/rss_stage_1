let upArrow = document.querySelector('.to-up_btn');

upArrow.onclick = function () {
    let linkPath = '#start-gifts';
    document.querySelector(linkPath).scrollIntoView({ behavior: 'smooth' });
}

window.onscroll = function () {
    if (window.innerWidth <= 768 && window.scrollY > 300) {
        upArrow.style.display = 'block';
    } else {
        upArrow.style.display = 'none';
    }
};

window.addEventListener('resize', () => {
    if (window.innerWidth <= 768 ) {
        upArrow.style.display = 'block';
    } else {
        upArrow.style.display = 'none';
    }

});