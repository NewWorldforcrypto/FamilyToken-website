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

    // Optional: Add a background animation to sections as they become visible
    const sectionsWithBackground = document.querySelectorAll("#about, #roadmap, #team");
    sectionsWithBackground.forEach(section => {
        section.style.transition = "background-color 1s ease-out";
        observer.observe(section);
    });
});
