const carousel = document.querySelector(".carousel");
const arrowBtns = document.querySelectorAll(".wrapper");
const firstCardWidth = carousel.querySelector(".card").offsetWidth;
const carouselChildren = [...carousel.children]

let isDragging = false, startX, startScroolLeft;

let cardPerView = Math.round(carousel.offsetWidth / firstCardWidth);

carouselChildren.slice(-cardPerView).reverse().forEach(card => {
    carousel.insertAdjacentHTML("afterbegin", card.outerHTML);
})

carouselChildren.slice(0, cardPerView).forEach(card => {
        carousel.insertAdjacentHTML("beforeend", card.outerHTML);
})

arrowBtns.forEach(btn => {
    btn.addEventListener("click", ()=> {
        carousel.scrollLeft += btn.id === "left" ? -firstCardWidth : firstCardWidth;
    })
});

const dragStart = (e) => {
    isDragging = true;
    carousel.classList.add("dragging");
    startX = e.pageX;
    startScroolLeft = carousel.scrollLeft;
}

const dragging = (e) =>{
    if(!isDragging) return;
    carousel.scrollLeft =startScroolLeft- (e.pageX - startX);
}

const dragStop = (e) => {
    isDragging = false;
    carousel.classList.remove("dragging");
}

const infiniteScroll = () =>{
    if(carousel.scrollLeft === 0){
        console.log("you have reached end");
    }
}

carousel.addEventListener("mousedown",dragStart);
carousel.addEventListener("mousemove",dragging);
document.addEventListener("mouseup",dragStop);
carousel.addEventListener("scroll",infiniteScroll);


