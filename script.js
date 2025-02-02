const text = "Building Stronger Families with Blockchain";
let index = 0;

function typeEffect() {
    document.getElementById("typing-text").textContent = text.substring(0, index++);
    if (index <= text.length) {
        setTimeout(typeEffect, 100);
    }
}

document.addEventListener("DOMContentLoaded", typeEffect);

// Optional: Add smooth scrolling to all anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});
