// ================== 1. مدیریت منوی همبرگری ==================
const toggleMenu = () => {
    const menu = document.querySelector('nav ul');
    const menuIcon = document.querySelector('.menu-icon');
    
    menu.classList.toggle('show');
    menuIcon.innerHTML = menu.classList.contains('show') ? "✖" : "&#9776;";
};

document.querySelectorAll("nav ul li a").forEach(link => {
    link.addEventListener("click", () => {
        const menu = document.querySelector('nav ul');
        const menuIcon = document.querySelector('.menu-icon');
        
        if (menu.classList.contains('show')) {
            menu.classList.remove('show');
            menuIcon.innerHTML = "&#9776;";
        }
    });
});

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
    const options = { threshold: 0.2 };
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, options);

    document.querySelectorAll("section").forEach(section => {
        section.classList.add('hidden');
        observer.observe(section);
    });
});

// ================== 3. تنظیم سرعت و جهت حرکت پس‌زمینه‌ها ==================
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

const canvas = document.getElementById("starsCanvas");
const ctx = canvas.getContext("2d");

// تنظیم اندازه‌ی canvas به اندازه‌ی صفحه
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// ایجاد آرایه‌ی ستاره‌ها
let stars = [];
const numStars = 200; // تعداد ستاره‌ها

for (let i = 0; i < numStars; i++) {
    stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 2 + 1, // اندازه‌ی متغیر
        speed: Math.random() * 0.5 + 0.2,
        alpha: Math.random() * 0.5 + 0.5, // میزان درخشندگی تصادفی
        fadeDirection: Math.random() > 0.5 ? 1 : -1 // تغییر شفافیت
    });
}

// متحرک‌سازی ستاره‌ها
function animateStars() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    stars.forEach(star => {
        // درخشندگی نرم
        star.alpha += star.fadeDirection * 0.01;
        if (star.alpha <= 0.3 || star.alpha >= 1) {
            star.fadeDirection *= -1;
        }

        // حرکت ستاره‌ها
        star.y += star.speed;
        if (star.y > canvas.height) {
            star.y = 0;
            star.x = Math.random() * canvas.width;
        }

        // رسم ستاره
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 223, 186, ${star.alpha})`; // رنگ گرم (طلایی)
        ctx.fill();
    });

    requestAnimationFrame(animateStars);
}

// شروع انیمیشن
animateStars();

// واکنش‌گرایی برای تنظیم اندازه‌ی مجدد
window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    stars.forEach(star => {
        star.x = Math.random() * canvas.width;
        star.y = Math.random() * canvas.height;
    });
});

// ================== 6. نمایش پیام هشدار هنگام کلیک روی دکمه‌های مهم ==================
document.querySelectorAll(".btn").forEach(button => {
    button.addEventListener("click", (event) => {
        event.preventDefault();
        setTimeout(() => alert("This feature is coming soon!"), 300); // تاخیر برای روان‌تر شدن
    });
});
