// ========== مدیریت منو ==========
function toggleMenu() {
    const menu = document.querySelector('nav ul');
    const menuIcon = document.querySelector('.menu-icon');

    menu.classList.toggle('show');
    menuIcon.classList.toggle('active');
}

// ========== افکت نمایش بخش‌ها ==========
document.addEventListener("DOMContentLoaded", function () {
    let sections = document.querySelectorAll("section");
    let observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("show");
            }
        });
    }, { threshold: 0.2 });

    sections.forEach(section => observer.observe(section));
});

// ========== حرکت نرم پس‌زمینه ==========
let position = 0;
function moveBackgrounds() {
    position += 1;
    document.querySelectorAll("#hero, #hero2, #hero3").forEach(bg => {
        bg.style.backgroundPosition = `${position * 0.02}px 0`;
    });
    requestAnimationFrame(moveBackgrounds);
}
moveBackgrounds();
