const articles = document.querySelectorAll("article");
const articles_arr = Array.from(articles);

let posArr = null;

let lastArticle = articles[articles.length - 1];
let lastHeight = lastArticle.offsetTop + lastArticle.offsetHeight;

setPos();

function setPos() {
    posArr = [];
    for(let el of articles){
        posArr.push(el.offsetTop);
        console.log(posArr); 
    }
    posArr.push(lastHeight);
    console.log(posArr); 
}

window.addEventListener("mousewheel",(e)=>{
    const delta = e.deltaY;
    const parent_item = articles_arr[0].parentNode;
    const active_item = parent_item.querySelector(".on");
    const active_index = articles_arr.indexOf(active_item);
    let target_value;
    if (delta < 0) target_value = posArr[active_index - 1];
    if (delta > 0) target_value = posArr[active_index  + 1];

    scrollAnimation(target_value, 1000);
})

function scrollAnimation(target_value, duration) {
    const startValue = window.scrollY || window.pageYOffset;
    const startTime = performance.now();
    function scrollStep(time) {
        const currentTime = time - startTime;
        const progress = Math.min(currentTime / duration, 1);
        const scrollPosition = startValue + (target_value - startValue) * progress;
        window.scrollTo(0,scrollPosition);

        if (currentTime < duration) {
            requestAnimationFrame(scrollStep);
        }
    }
    requestAnimationFrame(scrollStep);
}

window.addEventListener("scroll",()=>{
    let scroll = window.scrollY || window.pageYOffset;
    articles_arr.map((el, index)=>{
        if (scroll >= posArr[index]) {
            for(let el of articles_arr){
                el.classList.remove("on");
            }
            articles_arr[index].classList.add("on");
        }
    })
})