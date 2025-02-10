// ================== مدیریت منوی همبرگری ==================
const menu = document.querySelector("nav ul");
const menuIcon = document.querySelector(".menu-icon");
const menuItems = document.querySelectorAll("nav ul li");

// بررسی اندازه صفحه برای تشخیص دسکتاپ
const isDesktop = () => window.innerWidth >= 1024;

// تابع باز و بسته کردن منو
const toggleMenu = (event) => {
    event.stopPropagation(); // جلوگیری از بسته شدن منو هنگام کلیک روی آیکون

    menu.classList.toggle("show"); // افزودن یا حذف کلاس show برای نمایش منو
    menuIcon.innerHTML = menu.classList.contains("show") ? "✖" : "&#9776;"; // تغییر آیکون

    if (menu.classList.contains("show")) {
        showMenuItems(); // نمایش تدریجی گزینه‌های منو
    } else {
        resetMenuItems(); // مخفی کردن گزینه‌ها هنگام بسته شدن منو
    }
};

// رویداد کلیک روی آیکون منو
menuIcon.addEventListener("click", toggleMenu);

// بستن منو هنگام کلیک خارج از آن
document.addEventListener("click", (event) => {
    if (!menu.contains(event.target) && !menuIcon.contains(event.target)) {
        closeMenu();
    }
});

// بستن منو هنگام کلیک روی یکی از گزینه‌های منو و اسکرول نرم به بخش مربوطه
document.querySelectorAll("nav ul li a").forEach(link => {
    link.addEventListener("click", (event) => {
        event.preventDefault(); // جلوگیری از رفتار پیش‌فرض

        let targetId = link.getAttribute("href").substring(1);
        let targetSection = document.getElementById(targetId);

        if (targetSection) {
            // اسکرول نرم به بخش مربوطه
            smoothScroll(targetSection.offsetTop - 50, () => {
                closeMenu(); // بستن منو بعد از رسیدن به هدف
            });
        }
    });
});

// تابع نمایش تدریجی گزینه‌های منو
function showMenuItems() {
    menuItems.forEach((item, index) => {
        item.style.opacity = "0";
        item.style.transform = "translateY(20px)";
        item.style.transition = `opacity 0.4s ease-out ${index * 100}ms, transform 0.4s ease-out ${index * 100}ms`;
        setTimeout(() => {
            item.style.opacity = "1";
            item.style.transform = "translateY(0)";
        }, index * 100);
    });
}

// تابع ریست گزینه‌های منو هنگام بسته شدن
function resetMenuItems() {
    menuItems.forEach((item) => {
        item.style.opacity = "0";
        item.style.transform = "translateY(20px)";
        item.style.transition = "none"; // جلوگیری از تأخیر هنگام باز شدن بعدی
    });
}

// تابع اسکرول نرم
function smoothScroll(targetPosition, callback) {
    const startPosition = window.scrollY;
    const distance = targetPosition - startPosition;
    const duration = 600;
    let startTime = null;

    function animationScroll(currentTime) {
        if (!startTime) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const run = easeInOutQuad(timeElapsed, startPosition, distance, duration);
        window.scrollTo(0, run);

        if (timeElapsed < duration) {
            requestAnimationFrame(animationScroll);
        } else {
            callback(); // اطمینان از بسته شدن منو بعد از اتمام اسکرول
        }
    }

    function easeInOutQuad(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return (c / 2) * t * t + b;
        t--;
        return (-c / 2) * (t * (t - 2) - 1) + b;
    }

    requestAnimationFrame(animationScroll);
}

// تابع بستن منو
function closeMenu() {
    menu.classList.remove("show");
    menuIcon.innerHTML = "&#9776;";
    resetMenuItems();
}


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
    });

    button.addEventListener("mouseup", () => {
        button.style.transform = "scale(1)";
    });

    button.addEventListener("mouseleave", () => {
        button.style.transform = "scale(1)";
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

// ================== 5. تنظیم سرعت و جهت حرکت پس‌زمینه‌ها ==================
document.addEventListener("DOMContentLoaded", () => {
    const backgrounds = [
        { element: document.getElementById("hero"), speed: 0.02, direction: 1 },
        { element: document.getElementById("hero2"), speed: 0.02, direction: -1 },
        { element: document.getElementById("hero3"), speed: 0.02, direction: 1 },
        { element: document.getElementById("hero4"), speed: 0.02, direction: -1 },
        { element: document.getElementById("hero5"), speed: 0.02, direction: 1 },
        { element: document.getElementById("hero6"), speed: 0.02, direction: -1 },
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
window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

// ایجاد ذرات نوری با افکت‌های جذاب‌تر
const particles = [];
const numParticles = 120;

for (let i = 0; i < numParticles; i++) {
    particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 2.5 + 1,
        speedX: (Math.random() - 0.5) * 0.7,
        speedY: (Math.random() - 0.5) * 0.7,
        opacity: Math.random() * 0.5 + 0.4,
        color: `hsl(${Math.random() * 360}, 100%, 75%)`,
        glow: Math.random() > 0.7 ? true : false
    });
}

// انیمیشن ذرات
function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // گرادینت متحرک پس‌زمینه
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    gradient.addColorStop(0, "#14142a");
    gradient.addColorStop(0.5, "#0d284b");
    gradient.addColorStop(1, "#081c33");

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // طراحی ذرات
    particles.forEach(particle => {
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.shadowBlur = particle.glow ? 12 : 0;
        ctx.shadowColor = particle.glow ? particle.color : "transparent";
        ctx.fill();

        // حرکت سینوسی نرم برای حس شناوری
        particle.x += particle.speedX + Math.sin(Date.now() / 10000) * 0.3;
        particle.y += particle.speedY + Math.cos(Date.now() / 10000) * 0.3;

        // تغییر رنگ برای زیبایی بیشتر
        particle.color = `hsl(${(parseInt(particle.color.match(/\d+/)[0]) + 1) % 360}, 100%, 75%)`;

        // تنظیم شفافیت برای حس زنده‌تر
        particle.opacity += (Math.random() - 0.5) * 0.015;
        particle.opacity = Math.max(0.4, Math.min(0.9, particle.opacity));

        // بازگرداندن ذرات در صورت خروج از صفحه
        if (particle.x < 0 || particle.x > canvas.width) particle.speedX *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.speedY *= -1;
    });

    requestAnimationFrame(animateParticles);
}

// اجرای انیمیشن
animateParticles();