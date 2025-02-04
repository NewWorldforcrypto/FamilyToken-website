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

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// آرایه خانه‌های نورانی
let houses = [];
const numHouses = 20; // تعداد خانه‌ها

for (let i = 0; i < numHouses; i++) {
    houses.push({
        x: Math.random() * canvas.width,
        y: canvas.height - Math.random() * 100 - 50,
        width: 50,
        height: 40,
        lightOn: Math.random() > 0.5, // روشن یا خاموش
        lightAlpha: Math.random() * 0.5 + 0.5, // شدت نور
        fadeDirection: Math.random() > 0.5 ? 1 : -1
    });
}

// ایجاد ستاره‌های دنباله‌دار
let shootingStars = [];

function createShootingStar() {
    return {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height * 0.5,
        length: Math.random() * 50 + 30,
        speed: Math.random() * 5 + 2
    };
}

setInterval(() => {
    shootingStars.push(createShootingStar());
    if (shootingStars.length > 5) shootingStars.shift();
}, 3000);

// انیمیشن نهایی
function animateScene() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // کهکشان درخشان
    const gradient = ctx.createRadialGradient(
        canvas.width / 2, canvas.height / 3, 50,
        canvas.width / 2, canvas.height / 3, 300
    );
    gradient.addColorStop(0, "rgba(255, 215, 0, 0.5)");
    gradient.addColorStop(1, "rgba(255, 165, 0, 0)");

    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(canvas.width / 2, canvas.height / 3, 300, 0, Math.PI * 2);
    ctx.fill();

    // خانه‌های نورانی
    houses.forEach(house => {
        house.lightAlpha += house.fadeDirection * 0.01;
        if (house.lightAlpha <= 0.3 || house.lightAlpha >= 1) {
            house.fadeDirection *= -1;
        }

        ctx.fillStyle = "#8B4513"; // رنگ خانه
        ctx.fillRect(house.x, house.y, house.width, house.height);
        
        ctx.fillStyle = `rgba(255, 223, 186, ${house.lightAlpha})`; // نور پنجره
        ctx.fillRect(house.x + 15, house.y + 10, 20, 20);
    });

    // ستاره‌های دنباله‌دار
    shootingStars.forEach(star => {
        ctx.strokeStyle = "rgba(255, 255, 255, 0.8)";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(star.x, star.y);
        ctx.lineTo(star.x - star.length, star.y + star.length);
        ctx.stroke();
        star.x += star.speed;
        star.y += star.speed * 0.5;
    });

    requestAnimationFrame(animateScene);
}

// شروع انیمیشن
animateScene();

// واکنش‌گرایی
window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

// ================== 6. نمایش پیام هشدار هنگام کلیک روی دکمه‌های مهم ==================
document.querySelectorAll(".btn").forEach(button => {
    button.addEventListener("click", (event) => {
        event.preventDefault();
        setTimeout(() => alert("This feature is coming soon!"), 300); // تاخیر برای روان‌تر شدن
    });
});
