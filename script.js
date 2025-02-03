// Toggle Menu
function toggleMenu() {
    const menu = document.querySelector('nav ul');
    menu.classList.toggle('show');
    const menuIcon = document.querySelector('.menu-icon');
    menuIcon.innerHTML = menu.classList.contains('show') ? "✖" : "&#9776;";
}

// Hide menu on clicking outside
document.addEventListener("click", (event) => {
    const menu = document.querySelector('nav ul');
    const menuIcon = document.querySelector('.menu-icon');
    
    if (!menu.contains(event.target) && !menuIcon.contains(event.target)) {
        menu.classList.remove('show');
        menuIcon.innerHTML = "&#9776;";
    }
});

// Section Scroll Animation
document.addEventListener("DOMContentLoaded", function () {
    let sections = document.querySelectorAll("section");
    let options = { threshold: 0.2 };

    let observer = new IntersectionObserver((entries) => {
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

// Smooth Background Animation
document.addEventListener("DOMContentLoaded", function () {
    let position = 0;
    function moveBackgrounds() {
        position += 1;
        document.getElementById("hero").style.backgroundPosition = `${position}px 0`;
        document.getElementById("hero2").style.backgroundPosition = `-${position}px 0`;
        document.getElementById("hero3").style.backgroundPosition = `${position}px 0`;
        requestAnimationFrame(moveBackgrounds);
    }
    moveBackgrounds();
});
