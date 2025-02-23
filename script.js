// ================== 1. مدیریت منوی همبرگری با افکت‌های حرفه‌ای ==================
const toggleMenu = () => {
    const menu = document.querySelector("nav ul");
    const menuIcon = document.querySelector(".menu-icon");

    menu.classList.toggle("show");
    menuIcon.innerHTML = menu.classList.contains("show") ? "✖" : "&#9776;";
};

// متغیر برای کنترل وضعیت اسکرول
let isScrolling = false;

document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll("nav ul li a").forEach(link => {
        link.addEventListener("click", function (event) {
            event.preventDefault(); // جلوگیری از بارگذاری مجدد صفحه

            if (isScrolling) return; // اگر اسکرول در حال انجام است، هیچ کاری انجام نشود

            let targetId = this.getAttribute("href").substring(1); // گرفتن id از href
            let targetSection = document.getElementById(targetId);

            if (!targetSection) {
                console.error(`❌ بخش ${targetId} پیدا نشد!`);
                return;
            }

            console.log(`✅ در حال اسکرول به بخش: ${targetId}`);

            // حذف کلاس active از تمام لینک‌ها
            document.querySelectorAll("nav ul li a").forEach(item => {
                item.classList.remove("active");
            });

            // افزودن کلاس active به لینک کلیک شده
            this.classList.add("active");

            // تنظیم آدرس URL بدون تغییر صفحه
            history.pushState({}, "", `#${targetId}`);

            // نشان دادن اینکه اسکرول در حال انجام است
            isScrolling = true;

            // اسکرول به بخش با استفاده از scrollIntoView برای اسکرول نرم
            targetSection.scrollIntoView({
                behavior: "smooth", // انیمیشن روان
                block: "center" // این باعث می‌شود که بخش در وسط صفحه قرار گیرد
            });

            // بستن منو پس از اسکرول
            const menu = document.querySelector('nav ul');
            const menuIcon = document.querySelector('.menu-icon');
            if (menu.classList.contains('show')) {
                menu.classList.remove('show');
                menuIcon.innerHTML = "&#9776;";
            }

            // خاتمه دادن اسکرول پس از انجام
            setTimeout(() => {
                isScrolling = false;
            }, 1000); // مدت زمانی که اسکرول تمام می‌شود، می‌توانید آن را تنظیم کنید
        });
    });

    // ================== 1.1 اسکرول وسط صفحه برای دکمه Learn More ==================
    const learnMoreBtn = document.getElementById("learnMoreBtn");

    if (learnMoreBtn) {
        learnMoreBtn.addEventListener("click", function (event) {
            event.preventDefault(); // جلوگیری از پرش ناگهانی صفحه

            let targetSection = document.getElementById("about"); // بخش موردنظر

            if (!targetSection) {
                console.error("❌ بخش 'about' پیدا نشد!");
                return;
            }

            console.log("✅ اسکرول به بخش 'about'");

            // اسکرول به وسط صفحه
            targetSection.scrollIntoView({
                behavior: "smooth",
                block: "center"
            });
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
    let isScrolling = false;

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
            }
        });
    }, { threshold: 0.2 });

    sections.forEach(section => observer.observe(section));

    // 🚀 جلوگیری از گیر کردن اسکرول هنگام برگشت به بالا
    let lastScrollTop = window.scrollY;
    window.addEventListener("scroll", () => {
        if (!isScrolling) {
            isScrolling = true;
            requestAnimationFrame(() => {
                let scrollTop = window.scrollY;

                sections.forEach(section => {
                    const rect = section.getBoundingClientRect();
                    if (rect.top < window.innerHeight * 0.8) {
                        section.classList.add("visible");
                    }
                });

                // 🔥 جلوگیری از قفل شدن اسکرول
                if (scrollTop < lastScrollTop) {
                    document.body.style.overflowY = "auto"; // اسکرول همیشه فعال باشد
                }

                lastScrollTop = scrollTop;
                isScrolling = false;
            });
        }
    });
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

const canvas = document.getElementById("minimalBackground");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// تغییر اندازه‌ی خودکار
window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

// ایجاد ذرات نوری نئونی  
const particles = [];
const numParticles = 150;

for (let i = 0; i < numParticles; i++) {
    particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 3 + 1,
        speedX: (Math.random() - 0.5) * 1.2,
        speedY: (Math.random() - 0.5) * 1.2,
        color: `hsl(${Math.random() * 360}, 100%, 70%)`,
        glow: Math.random() > 0.6 ? true : false
    });
}

// انیمیشن ذرات
function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // گرادینت پس‌زمینه متحرک
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
        ctx.shadowBlur = particle.glow ? 15 : 0;
        ctx.shadowColor = particle.glow ? particle.color : "transparent";
        ctx.fill();

        // حرکت سینوسی نرم  
        particle.x += particle.speedX + Math.sin(Date.now() / 10000) * 0.5;
        particle.y += particle.speedY + Math.cos(Date.now() / 10000) * 0.5;

        // تغییر رنگ برای جذابیت بیشتر  
        particle.color = `hsl(${(parseInt(particle.color.match(/\d+/)[0]) + 1) % 360}, 100%, 70%)`;

        // بازگرداندن ذرات در صورت خروج از صفحه  
        if (particle.x < 0 || particle.x > canvas.width) particle.speedX *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.speedY *= -1;
    });

    requestAnimationFrame(animateParticles);
}

// اجرای انیمیشن
animateParticles();