$(document).ready(function () {
  // Check authentication state
  const isAuthenticated = sessionStorage.getItem("authToken");

  // Handle "Get Started" button
  $("#get-started").click(function () {
    if (isAuthenticated) {
      window.location.href = "dashboard.html";
    } else {
      window.location.href = "signup.html";
    }
  });
});

