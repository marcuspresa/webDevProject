document.getElementById("create-post-button").addEventListener("click", async function (event) {
	event.preventDefault()

	const postTitle = document.getElementById("post-title").value
	const postBody = document.getElementById("post-content").value

	fetch(defaultAddress.URL + ":" + defaultAddress.PORT + "/api/posts/new-post", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			"Authorization": "Bearer " + accessToken
		},
		body: JSON.stringify({ title: postTitle, body: postBody, accountId: userInfo.sub, username: userInfo.preferred_username })
	}).then(function (response) {
		console.log(response)
	}).catch(function (error) {
		console.log(error)
		alert(error)
	})

})
