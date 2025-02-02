document.addEventListener("DOMContentLoaded", function() {
    const hero = document.getElementById("hero");
    hero.style.opacity = "0";
    hero.style.transition = "opacity 2s ease-in-out";
    setTimeout(() => {
        hero.style.opacity = "1";
    }, 500);
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute("href")).scrollIntoView({
            behavior: "smooth"
        });
    });
});
