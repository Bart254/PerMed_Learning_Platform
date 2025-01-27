$(document).ready(function () {
  // Handle the error box
  function showErrorBox(message) {
    const errorBox = $('<div class="error-box"></div>');
    errorBox.text(message);
    $('body').append(errorBox);

    setTimeout(() => {
      errorBox.fadeOut(300, function () {
        $(this).remove();
      });
    }, 3000); // Automatically hide after 3 seconds
  }

  // Handle signup form submission
  $('#signup-form').on('submit', function (e) {
    e.preventDefault();

    const username = $('#signup-username').val();
    const email = $('#signup-email').val();
    const password = $('#signup-password').val();

    $.ajax({
			url: 'http://localhost:5000/register',
      method: 'POST',
      contentType: 'application/json',
      data: JSON.stringify({ username, email, password }),
      success: function (response) {
        // Handle success, e.g., redirect to login page or show success message
        alert('Signup successful! Redirecting to login...');
        window.location.href = 'login.html';
      },
      error: function (xhr) {
        // Display error from server response
        const errorMessage = xhr.responseJSON?.error || 'An error occurred during signup.';
        showErrorBox(errorMessage);
      },
    });
  });


	$('#login-form').on('submit', function (e) {
    e.preventDefault();
    const username = $('#login-username-email').val();
    const password = $('#login-password').val();
    $.ajax({
			url: 'http://localhost:5000/login',
			method: 'POST',
			contentType: 'application/json',
			data: JSON.stringify({ username, password }),
			success: function (response) {
				console.log('Login successful, received token:', response.data.token);
				// Save token to localStorage
				sessionStorage.setItem('authToken', response.data.token);

				// Confirm token is saved
				console.log('Stored Token:', sessionStorage.getItem('authToken'));

				if (!response.data.selectedTopics || response.data.selectedTopics.length === 0) {
					fetchTopics();
				} else {
					window.location.href = 'dashboard.html';
				}
			},
			error: function (xhr) {
				const errorMessage = xhr.responseJSON?.error || 'Invalid login credentials.';
				showErrorBox(errorMessage);
			},
		});
	});



	function fetchTopics() {
		$.ajax({
			url: 'http://localhost:5000/all/topics',
			method: 'GET',
			success: function (response) {
				populateTopics(response.topics);
				$('#topic-selection-modal').show();
			},
			error: function () {
				showErrorBox('Failed to load topics. Please try again.');
			},
		});
	}

	function populateTopics(topics) {
		const container = $('#topics-container');
		container.empty();
		topics.forEach(topic => {
			const checkbox = `
						<label>
								<input type="checkbox" name="topics" value="${topic}">
								${topic}
						</label><br>
				`;
			container.append(checkbox);
		});
	}

	// Handle topic form submission

	$('#topic-form').on('submit', function (e) {
		e.preventDefault();
		const selectedTopics = [];
		$('input[name="topics"]:checked').each(function () {
			selectedTopics.push($(this).val());
		});
		console.log(`${selectedTopics} ${localStorage.getItem('authToken')}`);
		
		$.ajax({
			url: 'http://localhost:5000/auth/topic/add',
			method: 'POST',
			contentType: 'application/json',
			headers: {
				authorization: `Bearer ${localStorage.getItem('authToken')}`,
			},
			data: JSON.stringify({ topic: selectedTopics }),
			success: function () {
				alert('Topics saved successfully! Redirecting to the dashboard...');
				window.location.href = 'dashboard.html';
			},
			error: function () {
				showErrorBox('Failed to save topics. Please try again.');
			},
		});
	});
});
