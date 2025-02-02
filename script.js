document.addEventListener("DOMContentLoaded", function () {
    let sections = document.querySelectorAll(".parallax");

    window.addEventListener("scroll", function () {
        let scrollY = window.scrollY;
        sections.forEach((section) => {
            let speed = section.getBoundingClientRect().top * 0.1;
            section.style.backgroundPositionY = `${speed}px`;
        });
    });

    sections.forEach((section) => {
        let bgImage = section.getAttribute("data-bg");
        section.style.backgroundImage = `url('images/${bgImage}')`;
    });
});
