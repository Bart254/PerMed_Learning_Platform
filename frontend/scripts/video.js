$(document).ready(function () {
  // Fetch videos from the backend
	const token = sessionStorage.getItem('authToken');

  $.ajax({
		url: 'http://localhost:5000/videos',
    method: 'GET',
		headers: {
			authorization: `Bearer ${token}`,
		},
    success: function (response) {
			const videos = response.videos;
      videos.forEach((video) => {
        const videoHTML = `
          <div class="w3-card w3-margin w3-hover-shadow">
            <div class="w3-container">
              <h2>${video.title}</h2>
              <div class="video-thumbnail" style="cursor: pointer;">
                <video width="100%" controls>
                  <source src="${video.url}" type="video/mp4">
                  Your browser does not support the video tag.
                </video>
              </div>
            </div>
          </div>
        `;
        $('#video-grid').append(videoHTML);
      });
    },
    error: function () {
      $('#video-grid').html('<p>Failed to load videos. Please try again later.</p>');
    },
  });
});

