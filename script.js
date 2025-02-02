document.addEventListener("DOMContentLoaded", function () {
    let sections = document.querySelectorAll("section");
    let options = { threshold: 0.3 };

    let observer = new IntersectionObserver(function (entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0)";
            }
        });
    }, options);

    sections.forEach(section => {
        section.style.opacity = "0";
        section.style.transform = "translateY(50px)";
        section.style.transition = "all 0.6s ease-out";
        observer.observe(section);
    });

    let backgrounds = document.querySelectorAll('.background');
    let index = 0;

    function changeBackground() {
        backgrounds.forEach((bg, i) => {
            bg.style.opacity = (i === index) ? "1" : "0";
        });
        index = (index + 1) % backgrounds.length;
    }

    setInterval(changeBackground, 5000); 
});
