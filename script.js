document.addEventListener("DOMContentLoaded", function () {
    let elements = document.querySelectorAll(".fade-in, .slide-in-up");
    let observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
            }
        });
    }, { threshold: 0.5 });

    elements.forEach(element => {
        observer.observe(element);
    });
});
