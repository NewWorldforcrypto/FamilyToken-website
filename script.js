// ================== Hamburger Menu ==================
function toggleMenu() {
    const menu = document.querySelector('nav ul');
    menu.classList.toggle('show');

    // Change the hamburger icon
    const menuIcon = document.querySelector('.menu-icon');
    if (menu.classList.contains('show')) {
        menuIcon.innerHTML = "✖"; // Change to close icon
    } else {
        menuIcon.innerHTML = "&#9776;"; // Change back to hamburger icon
    }
}

// Close the menu when clicking on a menu item (mobile)
document.querySelectorAll("nav ul li a").forEach(link => {
    link.addEventListener("click", () => {
        const menu = document.querySelector('nav ul');
        const menuIcon = document.querySelector('.menu-icon');
        
        if (menu.classList.contains('show')) {
            menu.classList.remove('show');
            menuIcon.innerHTML = "&#9776;"; // Revert to hamburger icon
        }
    });
});

// Close the menu when clicking outside of it (mobile)
document.addEventListener("click", (event) => {
    const menu = document.querySelector('nav ul');
    const menuIcon = document.querySelector('.menu-icon');
    
    if (!menu.contains(event.target) && !menuIcon.contains(event.target)) {
        menu.classList.remove('show');
        menuIcon.innerHTML = "&#9776;";
    }
});

// ================== Fade-in effect for sections on scroll ==================
document.addEventListener("DOMContentLoaded", function () {
    let sections = document.querySelectorAll("section");
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

// ================== Parallax effect for background ==================
document.addEventListener("DOMContentLoaded", function () {
    const backgrounds = [
        { element: document.getElementById("hero"), speed: 0.02, direction: 1 },
        { element: document.getElementById("hero2"), speed: 0.02, direction: -1 },
        { element: document.getElementById("hero3"), speed: 0.02, direction: 1 }
    ];

    let position = 0;

    function moveBackgrounds() {
        position += 1;
        backgrounds.forEach(bg => {
            if (bg.element) {
                let movement = position * bg.speed * bg.direction;
                bg.element.style.backgroundPosition = `${movement}px 0`;
            }
        });
        requestAnimationFrame(moveBackgrounds);
    }

    moveBackgrounds();
});

// ================== Button click alert ==================
document.querySelectorAll(".btn").forEach(button => {
    button.addEventListener("click", function (event) {
        event.preventDefault();
        alert("This feature is coming soon!");
    });
});
