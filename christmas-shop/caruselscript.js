let sliderContainer = document.querySelector('.slider_slider_container');
let slider = document.querySelector('.slider');
let leftArrow = document.querySelector('.slider_button.left');
let rightArrow = document.querySelector('.slider_button.right');

let currentClicksNumber = 0;
let maxClicksNumber = 0;
let stepPixels = 0;

leftArrow.onclick = function () {
    if (currentClicksNumber > 0) {
        currentClicksNumber--;
        moveSlider();
    }
};

rightArrow.onclick = function () {
    if (currentClicksNumber < maxClicksNumber) {
        currentClicksNumber++;
        moveSlider();
    }
};

function getMaxClicksNumber() {
    const visibleWidth = sliderContainer.offsetWidth;
    const totalWidth = slider.scrollWidth;
    const steps = window.innerWidth > 768 ? 3 : 6;
    stepPixels = (totalWidth - visibleWidth) / steps;
    maxClicksNumber = steps;
}

function moveSlider() {
    const offset = -(currentClicksNumber * stepPixels);
    slider.style.transform = `translateX(${offset}px)`;
    updateArrows();
}

function updateArrows() {
    leftArrow.classList.toggle('not_clickeable', currentClicksNumber <= 0);
    leftArrow.classList.toggle('clickeable', currentClicksNumber > 0);

    rightArrow.classList.toggle('not_clickeable', currentClicksNumber >= maxClicksNumber);
    rightArrow.classList.toggle('clickeable', currentClicksNumber < maxClicksNumber);
}

window.addEventListener('resize', () => {
    currentClicksNumber = 0;
    getMaxClicksNumber();
    moveSlider();
});

getMaxClicksNumber();
moveSlider();