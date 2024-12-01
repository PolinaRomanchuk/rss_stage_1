let sliderContainer = document.querySelector('.slider_slider_container');
let slider = document.querySelector('.slider');
let leftArrow = document.querySelector('.slider_button.left');
let rightArrow = document.querySelector('.slider_button.right');

let currentClicksNumber = 0;
let maxClicksNumber = 0;
let stepPercent = 0;

function getSlidesMaxIndex() {
    maxClicksNumber = window.innerWidth <= 768 ? 6 : 3;
}

function moveSlider(direction, step) {

    if (currentClicksNumber <= 0) {
        leftArrow.classList.add('not_clickeable');
        leftArrow.classList.remove('clickeable');

    } else {
        leftArrow.classList.remove('not_clickeable');
        leftArrow.classList.add('clickeable');
    }

    if (currentClicksNumber == maxClicksNumber) {
        rightArrow.classList.add('not_clickeable');
        rightArrow.classList.remove('clickeable');

    } else {
        rightArrow.classList.remove('not_clickeable');
        rightArrow.classList.add('clickeable');

    }
    let computedWidth = parseFloat(getComputedStyle(sliderContainer).width);
    let parentWidth = sliderContainer.parentElement.offsetWidth;
    let currentWidthPercent = (computedWidth / parentWidth) * 100;

    direction === 'right'
        ? sliderContainer.style.width = `${currentWidthPercent + step}%`
        : sliderContainer.style.width = `${currentWidthPercent - step}%`;
}


leftArrow.onclick = function () {
    getSlidesMaxIndex();
    if (currentClicksNumber > 0) {
        currentClicksNumber -= 1;
        moveSlider('left', stepPercent);
    }
};

rightArrow.onclick = function () {
    getSlidesMaxIndex();
    if (currentClicksNumber !== maxClicksNumber) {
        currentClicksNumber += 1;
        moveSlider('right', stepPercent);
    }
};

window.addEventListener('resize', () => {
    currentClicksNumber = 0;
    moveSlider();
    sliderContainer.style.width = "100%";
    stepPercent = calculateStep();

});

getSlidesMaxIndex();
stepPercent = calculateStep();



function calculateStep() {
    let wraper = document.querySelector('.slider_section_container');
    const wraperWidth = wraper.offsetWidth;

    const totalSliderWidth = slider.scrollWidth;
    const onepart = totalSliderWidth / (maxClicksNumber + 1);



    const visibleWidth = sliderContainer.offsetWidth;

    const stepPixels = totalSliderWidth / maxClicksNumber;
    return (onepart * 100) / wraperWidth;
}