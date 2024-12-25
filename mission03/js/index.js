const socials = document.querySelector(".socials");
const links = document.querySelector(".links");
let socialsGap = (750 - window.innerWidth)/30 + "rem";
socials.style.gap = socialsGap;
//창 줄이기 이벤트 리스너
window.addEventListener("resize", (e) => {
    //모바일 화면이면
    if(window.matchMedia(`all and (max-width: 743px)`).matches) {
        //화면 줄어들 때마다 gap이 커짐
        socialsGap = (750 - window.innerWidth)/20 + "rem";
        socials.style.gap = socialsGap;
        links.style.gap = socialsGap;
    }
})