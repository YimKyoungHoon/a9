const ul = document.querySelector("#slider ul");
const prev = document.querySelector(".prev");
const next = document.querySelector(".next");
const lis = ul.querySelectorAll("li img");
let len = lis.length
let enableClick = true;
init();
next.addEventListener("click", (e) => {
    e.preventDefault();
    if (enableClick) {
        nextSlide();
        enableClick = false;
    }


})

prev.addEventListener("click", (e) => {
    e.preventDefault();
    if (enableClick) {
        prevSlide();
        enableClick = false;
    }


})

function prevSlide() {
    const duration = 500;
    const initialValue = parseInt(ul.style.left) || -100;
    const targetValue = 0;
    const unit = "%";

    const startTime = performance.now();
    function animate(time) {
        const timeReal = time - startTime;

        const progress = timeReal / duration;

        const currentValue = initialValue + (targetValue - initialValue) * progress;
        ul.style.left = `${currentValue}${unit}`;


        if (progress < 1) {
            requestAnimationFrame(animate);
        } else if (progress >= 1) {
            ul.style.left = "-100%";
            ul.prepend(ul.lastElementChild);
            enableClick = true;
        }


    }
    requestAnimationFrame(animate);
}

function nextSlide() {
    const duration = 500;
    const initialValue = parseInt(ul.style.left) || -100;
    const targetValue = -200;
    const unit = "%";
    const startTime = performance.now();

    function animate(time) {
        const timeReal = time - startTime;
        const progress = timeReal / duration;
        const currentValue = initialValue + (targetValue - initialValue) * progress;
        ul.style.left = `${currentValue}${unit}`;

        if (progress < 1) {
            requestAnimationFrame(animate);
        } else if (progress >= 1) {
            ul.style.left = "-100%";
            ul.append(ul.firstElementChild);
            enableClick = true;
        }
    }
    requestAnimationFrame(animate);
}

function init() {
    ul.style.width = `${100 * len}%`;
    lis.forEach((el) => {
        el.style.width = `${100 / len}%`;
    })
    ul.style.left = "-100%";
    ul.prepend(ul.lastElementChild);
}