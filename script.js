// ================== 1. مدیریت منوی همبرگری با افکت‌های حرفه‌ای ==================
const toggleMenu = () => {
    const menu = document.querySelector('nav ul');
    const menuIcon = document.querySelector('.menu-icon');

    menu.classList.toggle('show');
    menuIcon.innerHTML = menu.classList.contains('show') ? "✖" : "&#9776;";
};

// تابع برای انیمیشن ورود گزینه‌های منو
const animateMenuItems = () => {
    const menuItems = document.querySelectorAll("nav ul li");
    menuItems.forEach((item, index) => {
        item.style.animation = `slideIn 0.5s ease-in-out ${index * 0.1 + 0.2}s forwards`;
    });
};

// بستن منو هنگام کلیک روی گزینه‌های داخلی
document.querySelectorAll("nav ul li a").forEach(link => {
    link.addEventListener("click", (event) => {
        const menu = document.querySelector('nav ul');
        const menuIcon = document.querySelector('.menu-icon');

        // پیمایش به بخش مورد نظر
        const targetId = link.getAttribute("href").substring(1);  // بخش هدف را پیدا می‌کند
        const targetSection = document.getElementById(targetId);

        // پیمایش به بخش مورد نظر با انیمیشن
        window.scrollTo({
            top: targetSection.offsetTop - 50,  // کمی فاصله از بالا
            behavior: "smooth"  // انیمیشن روان برای اسکرول
        });

        // بستن منو بعد از کلیک
        if (menu.classList.contains('show')) {
            menu.classList.remove('show');
            menuIcon.innerHTML = "&#9776;";
        }
    });
});

// بستن منو هنگام کلیک خارج از آن
document.addEventListener("click", (event) => {
    const menu = document.querySelector('nav ul');
    const menuIcon = document.querySelector('.menu-icon');

    if (!menu.contains(event.target) && !menuIcon.contains(event.target) && menu.classList.contains('show')) {
        menu.classList.remove('show');
        menuIcon.innerHTML = "&#9776;";
    }
});

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

// ================== 4. اسکرول نرم هنگام کلیک روی گزینه‌های منو ==================
// برای پیمایش به بخش‌های مختلف سایت
document.querySelectorAll("nav ul li a").forEach(link => {
    link.addEventListener("click", (event) => {
        event.preventDefault();  // از بارگذاری مجدد صفحه جلوگیری می‌کند
        
        // حذف کلاس active از تمام لینک‌ها
        document.querySelectorAll("nav ul li a").forEach(item => {
            item.classList.remove('active');
        });

        // افزودن کلاس active به لینک کلیک شده
        link.classList.add('active');

        const targetId = link.getAttribute("href").substring(1);  // بخش هدف را پیدا می‌کند
        const targetSection = document.getElementById(targetId);

        // پیمایش به بخش مورد نظر با انیمیشن
        window.scrollTo({
            top: targetSection.offsetTop - 50,  // کمی فاصله از بالا
            behavior: "smooth"  // انیمیشن روان برای اسکرول
        });

        // بستن منو بعد از کلیک
        const menu = document.querySelector('nav ul');
        const menuIcon = document.querySelector('.menu-icon');
        if (menu.classList.contains('show')) {
            menu.classList.remove('show');
            menuIcon.innerHTML = "&#9776;";
        }
    });
});

// ================== 5. تنظیم سرعت و جهت حرکت پس‌زمینه‌ها ==================
document.addEventListener("DOMContentLoaded", () => {
    const backgrounds = [
        { element: document.getElementById("hero"), speed: 0.02, direction: 1 },
        { element: document.getElementById("hero2"), speed: 0.02, direction: -1 },
        { element: document.getElementById("hero3"), speed: 0.02, direction: 1 },
        { element: document.getElementById("hero4"), speed: 0.02, direction: -1 },
        { element: document.getElementById("hero5"), speed: 0.02, direction: 1 }
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