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

// **۱. ایجاد صحنه، دوربین و رندر**
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById("nightSceneCanvas"), alpha: true });

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
renderer.shadowMap.enabled = true; // فعال کردن سایه‌ها

// **۲. ایجاد نورپردازی برای خیابان و پنجره‌های خانه‌ها**
const streetLight = new THREE.PointLight(0xffd700, 1, 100);
streetLight.castShadow = true;
streetLight.position.set(0, 5, 10);
scene.add(streetLight);

// **۳. ایجاد چند خانه در امتداد خیابان**
const houseGeometry = new THREE.BoxGeometry(4, 4, 4);
const houseMaterial = new THREE.MeshLambertMaterial({ color: 0xf2c57f });

for (let i = -10; i <= 10; i += 6) {
    let house = new THREE.Mesh(houseGeometry, houseMaterial);
    house.position.set(i, 2, -15);
    scene.add(house);

    // اضافه کردن چراغ داخل هر خانه
    let windowLight = new THREE.PointLight(0xfff000, 0.8, 10);
    windowLight.position.set(i, 3, -14);
    scene.add(windowLight);
}

// **۴. ایجاد ماه در آسمان**
const moonGeometry = new THREE.SphereGeometry(1.5, 32, 32);
const moonMaterial = new THREE.MeshBasicMaterial({ color: 0xaaaaaa });
const moon = new THREE.Mesh(moonGeometry, moonMaterial);
moon.position.set(10, 10, -30);
scene.add(moon);

// **۵. ساخت آسمان شب و کهکشان**
const textureLoader = new THREE.TextureLoader();
const galaxyTexture = textureLoader.load("images/galaxy.jpg");

const starsGeometry = new THREE.SphereGeometry(100, 32, 32);
const starsMaterial = new THREE.MeshBasicMaterial({
    map: galaxyTexture,
    side: THREE.BackSide
});
const starsMesh = new THREE.Mesh(starsGeometry, starsMaterial);
scene.add(starsMesh);

camera.position.z = 30;

// **۶. ایجاد انیمیشن شب زنده**
function animate() {
    requestAnimationFrame(animate);
    moon.rotation.y += 0.001; // چرخش آرام ماه
    starsMesh.rotation.y += 0.0005; // حرکت آرام آسمان

    renderer.render(scene, camera);
}
animate();

// **۷. تنظیم واکنش‌گرایی برای صفحه نمایش**
window.addEventListener("resize", () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
});

// ================== 6. نمایش پیام هشدار هنگام کلیک روی دکمه‌های مهم ==================
document.querySelectorAll(".btn").forEach(button => {
    button.addEventListener("click", (event) => {
        event.preventDefault();
        setTimeout(() => alert("This feature is coming soon!"), 300); // تاخیر برای روان‌تر شدن
    });
});
