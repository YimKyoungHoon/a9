const btnDiscography = document.querySelectorAll("#discography nav a");
const boxDiscography = document.querySelectorAll("#discography section");

btnDiscography.forEach((el, index) => {
    el.addEventListener("click", (e) => {
        e.preventDefault();
        // for(let el of btnDiscography) el.classList.remove("on");
        document.querySelector("nav a.on").classList.remove("on");
        btnDiscography[index].classList.add("on");
        // for(let el of boxDiscography) el.classList.remove("on");
        document.querySelector("section.on").classList.remove("on");
        boxDiscography[index].classList.add("on");

        setTimeout(() => {
            for(let el of boxDiscography) el.classList.remove("active");
            boxDiscography[index].classList.add("active");
        })
    })
})