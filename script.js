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

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById("nightSceneCanvas"), alpha: true });

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// نورپردازی
const streetLight = new THREE.PointLight(0xffd700, 1, 100);
streetLight.castShadow = true; // اضافه کردن سایه برای طبیعی‌تر شدن
streetLight.position.set(0, 5, 10);
scene.add(streetLight);

// ساخت خانه‌ها
const houseGeometry = new THREE.BoxGeometry(4, 4, 4);
const houseMaterial = new THREE.MeshLambertMaterial({ color: 0xf2c57f });
const house = new THREE.Mesh(houseGeometry, houseMaterial);
house.position.set(0, 2, -10);
scene.add(house);

// اضافه کردن پنجره‌ها و چراغ‌ها داخل خانه‌ها
const windowLight = new THREE.PointLight(0xfff000, 0.5, 10); // رنگ نور گرم برای پنجره‌ها
windowLight.position.set(0, 2, -10);
scene.add(windowLight);

// ماه و ستاره‌ها
const moonGeometry = new THREE.SphereGeometry(1, 32, 32);
const moonMaterial = new THREE.MeshBasicMaterial({ color: 0xaaaaaa });
const moon = new THREE.Mesh(moonGeometry, moonMaterial);
moon.position.set(10, 10, -30);
scene.add(moon);

// آسمان با افکت‌های ستاره‌ای
const textureLoader = new THREE.TextureLoader();
const galaxyTexture = textureLoader.load("images/galaxy.jpg", 
    function(texture) {
        console.log("Texture loaded successfully");
    }, 
    undefined, 
    function(err) {
        console.log("Error loading texture:", err);
    }
);

const starsMaterial = new THREE.MeshBasicMaterial({
    map: galaxyTexture, // اعمال تصویر کهکشان
    side: THREE.BackSide // معکوس کردن جهت آسمان برای نمایش داخل
});
const starsMesh = new THREE.Mesh(starsGeometry, starsMaterial);
scene.add(starsMesh);

camera.position.z = 30;

function animate() {
    requestAnimationFrame(animate);
    moon.rotation.y += 0.01;
    starsMesh.rotation.y += 0.0001;

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
