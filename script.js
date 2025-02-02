const text = "Building Stronger Families with Blockchain";
let index = 0;
function typeEffect() {
    document.getElementById("typing-text").textContent = text.substring(0, index++);
    if (index <= text.length) {
        setTimeout(typeEffect, 100);
    }
}
document.addEventListener("DOMContentLoaded", typeEffect);
