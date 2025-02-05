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

// تنظیمات اولیه
const canvas = document.getElementById("cityBackground");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// تغییر اندازه‌ی خودکار
window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

// اطلاعات اجرام آسمانی
const stars = [];
const numStars = 150; // تعداد ستاره‌ها
const moon = { x: canvas.width - 120, y: 80, radius: 50 };

// ایجاد ستاره‌های چشمک‌زن
for (let i = 0; i < numStars; i++) {
    stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height * 0.7,
        radius: Math.random() * 2 + 1,
        speed: Math.random() * 0.3 + 0.1,
        opacity: Math.random()
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

// طراحی جاده‌ی پرسپکتیو
function drawRoad() {
    ctx.fillStyle = "#2C2C2C"; // رنگ آسفالت
    ctx.beginPath();
    ctx.moveTo(canvas.width * 0.3, canvas.height);
    ctx.lineTo(canvas.width * 0.5 - 20, canvas.height * 0.4);
    ctx.lineTo(canvas.width * 0.5 + 20, canvas.height * 0.4);
    ctx.lineTo(canvas.width * 0.7, canvas.height);
    ctx.closePath();
    ctx.fill();

    // خط‌کشی خیابان
    ctx.strokeStyle = "yellow";
    ctx.lineWidth = 3;
    ctx.setLineDash([20, 15]); // خط‌چین وسط خیابان
    ctx.beginPath();
    ctx.moveTo(canvas.width * 0.5, canvas.height);
    ctx.lineTo(canvas.width * 0.5, canvas.height * 0.4);
    ctx.stroke();
}

// طراحی خانه‌های مدرن در دو طرف جاده
function drawBuildings() {
    for (let i = 0; i < 6; i++) {
        let x = (i % 2 === 0) ? canvas.width * 0.15 + i * 100 : canvas.width * 0.65 - i * 100;
        let y = canvas.height * 0.5 - Math.random() * 50;

        // بدنه خانه
        ctx.fillStyle = "#4A4A4A";
        ctx.fillRect(x, y, 60, 100);

        // پنجره‌ها با نور گرم
        ctx.fillStyle = Math.random() > 0.5 ? "#FFD700" : "#555";
        ctx.fillRect(x + 10, y + 20, 15, 20);
        ctx.fillRect(x + 35, y + 20, 15, 20);
        ctx.fillRect(x + 10, y + 50, 15, 20);
        ctx.fillRect(x + 35, y + 50, 15, 20);

        // سقف خانه
        ctx.fillStyle = "#3A3A3A";
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x + 30, y - 30);
        ctx.lineTo(x + 60, y);
        ctx.closePath();
        ctx.fill();
    }
}

// متحرک‌سازی ستاره‌های چشمک‌زن
function animateStars() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawNightSky();
    drawRoad();
    drawBuildings();

    stars.forEach(star => {
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
        ctx.fill();

        star.opacity += Math.random() * 0.02 - 0.01;
        if (star.opacity > 1) star.opacity = 1;
        if (star.opacity < 0.2) star.opacity = 0.2;
    });

    requestAnimationFrame(animateStars);
}

// اجرای انیمیشن
animateStars();