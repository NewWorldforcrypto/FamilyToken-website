// ================== 1. مدیریت منوی همبرگری با افکت‌های حرفه‌ای ==================
const toggleMenu = () => {
    const menu = document.querySelector("nav ul");
    const menuIcon = document.querySelector(".menu-icon");

    menu.classList.toggle("show");
    menuIcon.innerHTML = menu.classList.contains("show") ? "✖" : "&#9776;";
    menuIcon.style.transition = "transform 0.3s ease"; // انیمیشن نرم
    menuIcon.style.transform = menu.classList.contains("show") ? "rotate(90deg)" : "rotate(0deg)"; // چرخش آیکون
    menu.style.transition = "transform 0.5s ease, opacity 0.5s ease"; // انیمیشن برای منو
    menu.style.transform = menu.classList.contains("show") ? "translateX(0)" : "translateX(-100%)";
    menu.style.opacity = menu.classList.contains("show") ? "1" : "0";
    menu.style.boxShadow = menu.classList.contains("show") ? "0 4px 15px rgba(0, 0, 0, 0.3)" : "none"; // سایه
};

// متغیر برای کنترل وضعیت اسکرول
let isScrolling = false;

document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll("nav ul li a").forEach(link => {
        link.addEventListener("click", function (event) {
            event.preventDefault();

            if (isScrolling) return;

            let targetId = this.getAttribute("href").substring(1);
            let targetSection = document.getElementById(targetId);

            if (!targetSection) {
                alert(`بخش "${targetId}" پیدا نشد! یه نگاه به کد بندازید.`);
                console.error(`❌ بخش ${targetId} پیدا نشد!`);
                return;
            }

            console.log(`✅ در حال اسکرول به بخش: ${targetId}`);

            document.querySelectorAll("nav ul li a").forEach(item => item.classList.remove("active"));
            this.classList.add("active");

            history.pushState({}, "", `#${targetId}`);

            isScrolling = true;
            smoothScroll(targetSection); // استفاده از تابع پیشرفته

            const menu = document.querySelector("nav ul");
            const menuIcon = document.querySelector(".menu-icon");
            if (menu.classList.contains("show")) {
                menu.classList.remove("show");
                menuIcon.innerHTML = "&#9776;";
                menuIcon.style.transform = "rotate(0deg)";
            }

            setTimeout(() => {
                isScrolling = false;
            }, 800); // هماهنگ با مدت زمان اسکرول
        });
    });

    const learnMoreBtn = document.getElementById("learnMoreBtn");
    if (learnMoreBtn) {
        learnMoreBtn.addEventListener("click", function (event) {
            event.preventDefault();

            let targetSection = document.getElementById("about");
            if (!targetSection) {
                alert("بخش 'درباره ما' پیدا نشد!");
                console.error("❌ بخش 'about' پیدا نشد!");
                return;
            }

            console.log("✅ اسکرول به بخش 'about'");
            smoothScroll(targetSection); // استفاده از تابع پیشرفته
        });
    }
});

// 🚀 تابع پیشرفته برای اسکرول نرم
function smoothScroll(target) {
    const targetPosition = target.getBoundingClientRect().top + window.scrollY - 50;
    const startPosition = window.scrollY;
    const distance = targetPosition - startPosition;
    const duration = 800; // مدت زمان اسکرول
    let startTime = null;

    function animationScroll(currentTime) {
        if (!startTime) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const scrollAmount = easeInOutQuad(timeElapsed, startPosition, distance, duration);
        window.scrollTo(0, scrollAmount);
        if (timeElapsed < duration) requestAnimationFrame(animationScroll);
    }

    function easeInOutQuad(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return (c / 2) * t * t + b;
        t--;
        return (-c / 2) * (t * (t - 2) - 1) + b;
    }

    requestAnimationFrame(animationScroll);
}

// ================== 2. افکت نمایش تدریجی بخش‌ها هنگام اسکرول ==================
document.addEventListener("DOMContentLoaded", () => {
    const sections = document.querySelectorAll(".fade-in");

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
            }
        });
    }, { threshold: 0.2 });

    sections.forEach(section => observer.observe(section));
});

// ================== 3. افکت فشرده‌سازی دکمه‌ها ==================
document.querySelectorAll(".btn").forEach(button => {
    button.addEventListener("mousedown", () => {
        button.style.transform = "scale(0.95)";
        button.style.boxShadow = "0 2px 10px rgba(0, 0, 0, 0.2)"; // سایه موقع کلیک
    });

    button.addEventListener("mouseup", () => {
        button.style.transform = "scale(1)";
        button.style.boxShadow = "0 4px 15px rgba(0, 0, 0, 0.1)"; // سایه معمولی
    });

    button.addEventListener("mouseleave", () => {
        button.style.transform = "scale(1)";
        button.style.boxShadow = "0 4px 15px rgba(0, 0, 0, 0.1)";
    });

    // افکت هاور برای جذابیت بیشتر
    button.addEventListener("mouseenter", () => {
        button.style.transform = "scale(1.05)";
        button.style.boxShadow = "0 6px 20px rgba(0, 0, 0, 0.15)";
    });
});

// ================== 4. بستن منو هنگام کلیک خارج از آن ==================
document.addEventListener("click", (event) => {
    const menu = document.querySelector("nav ul");
    const menuIcon = document.querySelector(".menu-icon");

    if (!menu.contains(event.target) && !menuIcon.contains(event.target) && menu.classList.contains("show")) {
        menu.classList.remove("show");
        menuIcon.innerHTML = "&#9776;";
    }
});

function refreshPage() {
    location.reload(); // رفرش صفحه
}

// ================== 5. تنظیم سرعت و جهت حرکت پس‌زمینه‌ها ==================
document.addEventListener("DOMContentLoaded", () => {
    const backgrounds = [
        { element: document.getElementById("hero"), speed: 0.02, direction: 1 },
        { element: document.getElementById("hero2"), speed: 0.02, direction: -1 },
        { element: document.getElementById("hero3"), speed: 0.02, direction: 1 },
        { element: document.getElementById("hero4"), speed: 0.02, direction: -1 },
        { element: document.getElementById("hero5"), speed: 0.02, direction: 1 },
        { element: document.getElementById("hero6"), speed: 0.02, direction: -1 },
        { element: document.getElementById("hero7"), speed: 0.02, direction: 1 },
    ];

    let position = 0;

    function moveBackgrounds() {
        position += 1;
        backgrounds.forEach(bg => {
            if (bg.element) {
                const movement = position * bg.speed * bg.direction;
                bg.element.style.backgroundPosition = `${movement}px 0`;
            }
        });
        requestAnimationFrame(moveBackgrounds);
    }

    moveBackgrounds();
});

// تنظیمات اولیه
const canvas = document.getElementById("minimalBackground");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// تغییر اندازه‌ی خودکار
canvas.addEventListener("mousemove", (e) => {
    particles.forEach(particle => {
        const dx = e.x - particle.x;
        const dy = e.y - particle.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 100) {
            particle.x += dx * 0.02;
            particle.y += dy * 0.02;
        }
    });
});

function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    gradient.addColorStop(0, "#14142a");
    gradient.addColorStop(0.5, "#0d284b");
    gradient.addColorStop(1, "#081c33");

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    particles.forEach(particle => {
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.shadowBlur = particle.glow ? 12 : 0;
        ctx.shadowColor = particle.glow ? particle.color : "transparent";
        ctx.fill();

        particle.x += particle.speedX + Math.sin(Date.now() / 10000) * 0.3;
        particle.y += particle.speedY + Math.cos(Date.now() / 10000) * 0.3;
        particle.color = `hsl(${(parseInt(particle.color.match(/\d+/)[0]) + 1) % 360}, 100%, 75%)`;
        particle.opacity += (Math.random() - 0.5) * 0.015;
        particle.opacity = Math.max(0.4, Math.min(0.9, particle.opacity));

        if (particle.x < 0 || particle.x > canvas.width) particle.speedX *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.speedY *= -1;

        // اتصال ذرات نزدیک
        particles.forEach(otherParticle => {
            const dx = particle.x - otherParticle.x;
            const dy = particle.y - otherParticle.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            if (distance < 50) {
                ctx.beginPath();
                ctx.moveTo(particle.x, particle.y);
                ctx.lineTo(otherParticle.x, otherParticle.y);
                ctx.strokeStyle = `rgba(255, 255, 255, ${1 - distance / 50})`;
                ctx.lineWidth = 1;
                ctx.stroke();
            }
        });
    });

    requestAnimationFrame(animateParticles);
}

animateParticles();

async function loadArticles() {
    try {
        const response = await fetch("articles.json");
        const articles = await response.json();
        const articlesList = document.getElementById("articlesList");

        articles.forEach(article => {
            const li = document.createElement("li");
            li.innerHTML = `<a href="${article.link}" target="_blank"><strong>${article.title}</strong></a> - ${article.date}<br><small>${article.summary}</small>`;
            articlesList.appendChild(li);
        });
    } catch (error) {
        console.error("Error loading articles:", error);
    }
}

function filterArticles() {
    const query = document.getElementById("searchArticles").value.toLowerCase();
    const articles = document.querySelectorAll("#articlesList li");

    articles.forEach(article => {
        if (article.innerText.toLowerCase().includes(query)) {
            article.style.display = "block";
        } else {
            article.style.display = "none";
        }
    });
}

loadArticles();

async function getFileSize() {
    try {
        const response = await fetch("docs/whitepaper.pdf", { method: "HEAD" });
        const size = response.headers.get("content-length");
        if (size) {
            document.getElementById("fileSize").innerText = (size / (1024 * 1024)).toFixed(2);
        }
    } catch (error) {
        console.error("Error fetching file size:", error);
    }
}

function trackDownload() {
    let count = localStorage.getItem("whitepaperDownloads") || 0;
    count = parseInt(count) + 1;
    localStorage.setItem("whitepaperDownloads", count);
    document.getElementById("downloadCount").innerText = count;
}

document.getElementById("whitepaperLink").addEventListener("click", trackDownload);

document.getElementById("downloadCount").innerText = localStorage.getItem("whitepaperDownloads") || 0;
getFileSize();