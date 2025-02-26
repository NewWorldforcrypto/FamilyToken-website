fetch('news.json')
    .then(response => response.json())
    .then(data => {
        const newsContainer = document.querySelector('.news-list');
        newsContainer.innerHTML = '';

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