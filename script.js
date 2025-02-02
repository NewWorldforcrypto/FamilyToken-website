document.addEventListener("DOMContentLoaded", function() {
    let elements = document.querySelectorAll(".fade-in, .slide-up");
    let observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
            }
        });
    });

    elements.forEach(element => {
        observer.observe(element);
    });
});
