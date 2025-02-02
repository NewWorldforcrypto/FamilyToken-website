document.addEventListener("DOMContentLoaded", function () {
    let sections = document.querySelectorAll("section");
    let options = { threshold: 0.2 };

    let observer = new IntersectionObserver(function (entries, observer) {
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

    // Navbar background change on scroll
    window.addEventListener("scroll", function () {
        let header = document.querySelector("header");
        if (window.scrollY > 50) {
            header.style.background = "rgba(0, 0, 0, 0.95)";
        } else {
            header.style.background = "rgba(0, 0, 0, 0.8)";
        }
    });
});
