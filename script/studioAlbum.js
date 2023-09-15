//변수
const panels = document.querySelectorAll("#visual article");
const btns = document.querySelectorAll(".btns li");
const btnPlay = document.querySelector(".fa-play");
const btnStop = document.querySelector(".fa-stop");
const bar = document.querySelector(".bar");

const len = panels.length - 1;
let num = 0;
let timer = null;
const interval = 5000;

startRolling();

btns.forEach((el, index) => {
    el.addEventListener("click", () => {
        active(index);
        stopRolling();
    })
});

btnPlay.addEventListener("click", (e) => {
    if (e.target.classList.contains("on")) {
        return;
    } else{
        startRolling();
    }
});

btnStop.addEventListener("click", stopRolling);

function startRolling() {
    bar.style.display = "block";
    setTimeout(progress, 0);
    active(num);
    timer = setInterval(rolling, interval);
    btnPlay.classList.add("on");
    btnStop.classList.remove("on");
}

function stopRolling() {
    bar.style.display = "none";
    clearInterval(timer);
    btnStop.classList.add("on");
    btnPlay.classList.remove("on");
}

function active(index) {
    for(let el of panels) el.classList.remove("on");
    for(let el of btns) el.classList.remove("on");
    panels[index].classList.add("on");
    btns[index].classList.add("on");
    num = index;
    bar.style.width = "0%";
}

function rolling() {
    if (num < len) {
        num++;
    } else {
        num = 0;
    }
    active(num);
    progress();
}

function progress() {
    const init = parseInt(bar.style.width) || 0;
    const unit = "%";
    const startTime = performance.now();
    function animate(time) {
        const realTime = time - startTime;
        const prog = realTime / interval;
        const currentValue = init + 100 * prog;
        bar.style.width = `${currentValue}${unit}`;
        if (prog < 1) {
            requestAnimationFrame(animate)
        } else if (prog >= 1) {
            bar.style.width = "0%"
        }
    }
    requestAnimationFrame(animate);
}