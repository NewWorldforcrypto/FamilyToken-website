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

// دریافت عنصر canvas و تنظیمات اولیه
const canvas = document.getElementById("nightSkyCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// تغییر اندازه‌ی خودکار هنگام تغییر اندازه‌ی صفحه
window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

// اطلاعات اجرام آسمانی
const stars = [];
const numStars = 200; // تعداد ستاره‌ها
const moon = { x: canvas.width - 150, y: 100, radius: 50 };

// ایجاد ستاره‌ها با موقعیت تصادفی
for (let i = 0; i < numStars; i++) {
    stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height * 0.8,
        radius: Math.random() * 2 + 1,
        speed: Math.random() * 0.5 + 0.2
    });
}

// طراحی آسمان شب و ماه
function drawNightSky() {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // طراحی ماه
    ctx.beginPath();
    ctx.arc(moon.x, moon.y, moon.radius, 0, Math.PI * 2);
    ctx.fillStyle = "#ffffcc";
    ctx.fill();
    
    // ایجاد نور ملایم برای ماه
    const gradient = ctx.createRadialGradient(moon.x, moon.y, 10, moon.x, moon.y, moon.radius * 1.5);
    gradient.addColorStop(0, "rgba(255, 255, 200, 0.8)");
    gradient.addColorStop(1, "rgba(0, 0, 0, 0)");
    ctx.fillStyle = gradient;
    ctx.fillRect(moon.x - moon.radius * 2, moon.y - moon.radius * 2, moon.radius * 4, moon.radius * 4);
}

// طراحی خیابان و خانه‌ها
function drawStreet() {
    // خیابان
    ctx.fillStyle = "#333";
    ctx.fillRect(0, canvas.height - 100, canvas.width, 100);

    // خط‌کشی خیابان
    ctx.fillStyle = "yellow";
    for (let i = 0; i < canvas.width; i += 40) {
        ctx.fillRect(i, canvas.height - 50, 20, 5);
    }

    // خانه‌ها
    for (let i = 50; i < canvas.width; i += 150) {
        ctx.fillStyle = "#654321"; // رنگ دیوار خانه
        ctx.fillRect(i, canvas.height - 150, 80, 50); // دیوار خانه

        ctx.fillStyle = "#fffacd"; // پنجره‌های روشن
        ctx.fillRect(i + 20, canvas.height - 140, 10, 15);
        ctx.fillRect(i + 50, canvas.height - 140, 10, 15);
    }
}

// متحرک‌سازی ستاره‌ها
function animateStars() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawNightSky();
    drawStreet();

    stars.forEach(star => {
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = "white";
        ctx.fill();

        star.y += star.speed;
        if (star.y > canvas.height - 100) {
            star.y = 0;
            star.x = Math.random() * canvas.width;
        }
    });

    requestAnimationFrame(animateStars);
}

// اجرای انیمیشن
animateStars();