let cachedPostId = null

const config = require("../config")

function updateEditPostPage(postId) {

	cachedPostId = postId

	fetch(config.defaultURL+":"+defaultPORT+"/api/your-post/"+ postId, {
		method: "GET",
		headers: {
			"Authorization": "Bearer " + accessToken
		},
	}).then(function (response) {
		return response.json()
	}).then(function (post) {

		document.getElementById("edit-post-title").value = post.title
		document.getElementById("edit-post-content").value = post.post

	}).catch(function (error) {
		console.log(error)
		alert(error)
	})

}

document.addEventListener("DOMContentLoaded", function () {

	const editPostForm = document.querySelector("#edit-post-page form")

	editPostForm.addEventListener("submit", function (event) {
		event.preventDefault()

		const title = document.getElementById("edit-post-title").value
		const content = document.getElementById("edit-post-content").value

		fetch("http://192.168.99.100:8080/api/your-post/" + cachedPostId, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
				"Authorization": "Bearer " + accessToken
			},
			body: JSON.stringify({
				id: cachedPostId,
				title: title,
				post: content,
				accountId: userInfo.sub
			})
		}).then(function (response) {
			console.log(response)
		}).catch(function (error) {
			console.log(error)
		})

	})

})