document.addEventListener("DOMContentLoaded", function () {
    let sections = document.querySelectorAll(".parallax");

    window.addEventListener("scroll", function () {
        let scrollY = window.scrollY;
        sections.forEach((section, index) => {
            let speed = section.getBoundingClientRect().top * 0.1;
            section.style.backgroundPositionY = `${speed}px`;
            
            // Smooth fade-in effect for text and buttons
            let text = section.querySelector("h1, h2, p, .btn");
            if (text) {
                let opacity = Math.max(0, 1 - Math.abs(speed) / 200);
                text.style.opacity = opacity;
                text.style.transform = `translateY(${speed * 0.2}px)`;
            }
        });
    });

    sections.forEach((section) => {
        let bgImage = section.getAttribute("data-bg");
        section.style.backgroundImage = `url('images/${bgImage}')`;
    });
});
