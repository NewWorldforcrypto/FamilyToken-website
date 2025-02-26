fetch('news.json')
    .then(response => response.json())
    .then(data => {
        const newsContainer = document.querySelector('.news-list');
        newsContainer.innerHTML = ''; // Clear any existing news

        data.forEach(news => {
            const newsItem = document.createElement('article');
            newsItem.classList.add('news-item');
            newsItem.innerHTML = `
                <h2>${news.title}</h2>
                <p>${news.content}</p>
                <a href="${news.link}">Read More</a>
            `;
            newsContainer.appendChild(newsItem);
        });
    })
    .catch(error => console.error('Error loading news:', error));

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

    // گرادینت پس‌زمینه جدید
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    gradient.addColorStop(0, "#ff0099");
    gradient.addColorStop(0.5, "#493240");
    gradient.addColorStop(1, "#1e0f32");

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

        // تغییر رنگ به‌صورت پویا
        particle.color = `hsl(${(parseInt(particle.color.match(/\d+/)[0]) + 1) % 360}, 100%, 70%)`;

        // بازگرداندن ذرات در صورت خروج از صفحه
        if (particle.x < 0 || particle.x > canvas.width) particle.speedX *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.speedY *= -1;
    });

    requestAnimationFrame(animateParticles);
}

// اجرای انیمیشن
animateParticles();