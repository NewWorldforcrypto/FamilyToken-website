// افکت پارالاکس روی حرکت ماوس
document.addEventListener("mousemove", function (event) {
    let mouseX = event.clientX / window.innerWidth;
    let mouseY = event.clientY / window.innerHeight;

    document.querySelectorAll(".parallax").forEach(function (element) {
        let speed = element.getAttribute("data-speed");
        let x = (mouseX - 0.5) * speed;
        let y = (mouseY - 0.5) * speed;
        element.style.transform = `translate(${x}px, ${y}px)`;
    });
});

// انیمیشن ورود به سایت
document.addEventListener("DOMContentLoaded", function () {
    document.querySelector("#hero h1").classList.add("fade-in");
    document.querySelector("#hero p").classList.add("fade-in");
});

// انیمیشن هنگام اسکرول
window.addEventListener("scroll", function () {
    let scrollPosition = window.scrollY;
    document.querySelectorAll(".animate").forEach((el) => {
        let position = el.getBoundingClientRect().top;
        let windowHeight = window.innerHeight;
        if (position < windowHeight * 0.8) {
            el.classList.add("visible");
        }
    });
});