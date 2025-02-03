// ================== 1. مدیریت منوی همبرگری ==================
function toggleMenu() {
    const menu = document.querySelector('nav ul');
    menu.classList.toggle('show');

    // تغییر آیکون منوی همبرگری هنگام باز و بسته شدن
    const menuIcon = document.querySelector('.menu-icon');
    if (menu.classList.contains('show')) {
        menuIcon.innerHTML = "✖"; // تغییر آیکون به ضربدر
    } else {
        menuIcon.innerHTML = "&#9776;"; // تغییر به آیکون سه خط
    }
}

// بستن منو هنگام کلیک روی گزینه‌ها (فقط در موبایل)
document.querySelectorAll("nav ul li a").forEach(link => {
    link.addEventListener("click", () => {
        const menu = document.querySelector('nav ul');
        const menuIcon = document.querySelector('.menu-icon');
        
        if (menu.classList.contains('show')) {
            menu.classList.remove('show');
            menuIcon.innerHTML = "&#9776;"; // بازگرداندن آیکون به سه خط
        }
    });
});

// بستن منو هنگام کلیک خارج از آن در موبایل
document.addEventListener("click", (event) => {
    const menu = document.querySelector('nav ul');
    const menuIcon = document.querySelector('.menu-icon');
    
    if (!menu.contains(event.target) && !menuIcon.contains(event.target)) {
        menu.classList.remove('show');
        menuIcon.innerHTML = "&#9776;";
    }
});
