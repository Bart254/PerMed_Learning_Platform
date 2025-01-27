$(document).ready(function () {
  // Fetch articles from the backend
	const token = sessionStorage.getItem('authToken');
  $.ajax({
		url: 'http://localhost:5000/articles',
		headers: {
			authorization: `Bearer ${token}`,
		},
    method: 'GET',
    success: function (response) {
			const articles = response.articles;
			console.log(`Here are articles: ${articles}`);
      articles.forEach((article) => {
        const articleHTML = `
          <div class="w3-card w3-margin w3-hover-shadow">
            <div class="w3-container">
              <h2>${article.title}</h2>
              <button class="w3-button w3-red expand-button">Read More</button>
              <p class="full-content w3-hide">${article.content}</p>
            </div>
          </div>
        `;
        $('#article-list').append(articleHTML);
      });

      // Expand article on button click
      $('.expand-button').on('click', function () {
        const fullContent = $(this).siblings('.full-content');
        fullContent.toggleClass('w3-hide');
        $(this).text(fullContent.hasClass('w3-hide') ? 'Read More' : 'Show Less');
      });
    },
    error: function (xhr) {
			if (xhr.status == 401) window.location.href = "index.html";
      $('#article-list').html('<p>Failed to load articles. Please try again later.</p>');
    },
  });
});

