document.addEventListener("DOMContentLoaded", function () {
    let sections = document.querySelectorAll(".parallax .content");
    let options = { threshold: 0.2 };

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
});
