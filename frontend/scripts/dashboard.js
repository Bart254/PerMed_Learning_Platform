$(document).ready(function () {

	// check for localStorage
	console.log('Stored Token:', sessionStorage.getItem('authToken'));

	const recommended = [
		{ title: "Managing Hypertension", link: "article1.html" },
		{title: "Understanding Diabetes", link: "article2.html" },
	];

	recommended.forEach((item) => {
		$("#recommended-content").append(
			`<li><a href="${item.link}">${item.title}</a></li>`
		);
	});
});
