
function listenClickOnAnchor(event) {
	event.preventDefault();
	const uri = event.currentTarget.getAttribute("href");
	changePage(uri);
	history.pushState({ uri: uri }, "", uri);
}

document.addEventListener("DOMContentLoaded", function () {
	const anchors = document.querySelectorAll("a");
	for (const anchor of anchors) {
		anchor.addEventListener("click", listenClickOnAnchor);
	}
});

history.replaceState({ uri: "/" }, "", "/")

window.addEventListener('popstate', function (event) {
	const state = event.state
	changePage(state.uri)
})

function changePage(uri) {

	// Hide current page.
	document.querySelector(".current-page").classList.remove("current-page")

	// Display new page.
	let id

	if (uri == "/") {
		id = "home-page"
	} else if (uri == "/signup") {
		id = "sign-up-page"
	} else if (uri == "/login") {
		id = "sign-in-page"
	} else if (uri == "/posts") {
		id = "show-posts-page"
		updateShowPostPage()
	} else if (uri == "/your-posts") {
		id = "your-posts-page"
		getYourPost()
	} else if (uri.startsWith("/your-post/")) {
		const postId = parseInt(uri.split("/")[2])
		id = "edit-post-page"
		updateEditPostPage(postId)
	} else if (uri.startsWith("/delete/")) {
		const postId = parseInt(uri.split("/")[2])
		deletePostPage(postId)
	} else if (uri.startsWith("/create-post")) {
		id = "create-post-page"
	} else {
		id = "/"
	}

	document.getElementById(id).classList.add("current-page")

}