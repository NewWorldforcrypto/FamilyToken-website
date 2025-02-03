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
        observer.observe(section);
    });

    // Fixing Parallax Issue for Mobile
    function updateParallax() {
        let scrollPosition = window.scrollY;
        document.querySelectorAll(".parallax").forEach((section, index) => {
            let speed = 0.5;
            section.style.backgroundPositionY = (scrollPosition * speed) + "px";
        });
    }

    window.addEventListener("scroll", updateParallax);
});
