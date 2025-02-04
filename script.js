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

// ستاره‌های متحرک
const canvas = document.getElementById("starsCanvas");
const ctx = canvas.getContext("2d");

// تنظیم اندازه canvas
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// چاپ ابعاد canvas در کنسول برای بررسی
console.log("Canvas Size: ", canvas.width, canvas.height);

let stars = [];
let numStars = 150;

// ایجاد ستاره‌ها
for (let i = 0; i < numStars; i++) {
    stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 2,
        speed: Math.random() * 0.5 + 0.2
    });
}

// چاپ اطلاعات ستاره‌ها در کنسول برای بررسی
console.log("Stars: ", stars);

function animateStars() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    stars.forEach(star => {
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = "white";
        ctx.fill();

        star.y += star.speed;
        if (star.y > canvas.height) {
            star.y = 0;
            star.x = Math.random() * canvas.width;
        }
    });

    requestAnimationFrame(animateStars);
}

animateStars();

// 1️⃣ ایجاد صحنه، دوربین و رندرر
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById("threeCanvas"), alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// 2️⃣ اضافه کردن نور برای جلوه‌ی طبیعی‌تر
const light = new THREE.PointLight(0xffffff, 1.5, 100);
light.position.set(10, 10, 10);
scene.add(light);

const ambientLight = new THREE.AmbientLight(0x404040);
scene.add(ambientLight);

// بارگذاری تکسچر
const textureLoader = new THREE.TextureLoader();
const saturnTexture = textureLoader.load('images/saturn_texture.jpg');

// ایجاد گوی با تکسچر زحل
const geometry = new THREE.SphereGeometry(5, 64, 64); // افزایش تعداد تقسیمات برای دقت بیشتر
const material = new THREE.MeshPhongMaterial({
    map: saturnTexture,
    shininess: 5,  // تنظیم میزان درخشندگی
});
const sphere = new THREE.Mesh(geometry, material);
scene.add(sphere);

// تنظیم موقعیت دوربین
camera.position.z = 20;

// نورپردازی
const ambientLight = new THREE.AmbientLight(0x404040, 1); // نور محیطی
scene.add(ambientLight);

const pointLight = new THREE.PointLight(0xffffff, 1, 100);
pointLight.position.set(10, 10, 10);
scene.add(pointLight);

// چرخش طبیعی گوی
function animate() {
    requestAnimationFrame(animate);

    // چرخش گوی به سمت y و کج کردن آن به سمت x
    sphere.rotation.y += 0.01; // چرخش حول محور Y
    sphere.rotation.x += 0.002; // کمی کج کردن حول محور X

    renderer.render(scene, camera);
}

animate();

// ================== 6. نمایش پیام هشدار هنگام کلیک روی دکمه‌های مهم ==================
document.querySelectorAll(".btn").forEach(button => {
    button.addEventListener("click", (event) => {
        event.preventDefault();
        setTimeout(() => alert("This feature is coming soon!"), 300); // تاخیر برای روان‌تر شدن
    });
});
