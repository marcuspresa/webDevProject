let cachedPostId = null


function updateEditPostPage(postId) {

	cachedPostId = postId
	fetch(defaultAddress.URL+":"+defaultAddress.PORT+"/api/posts/your-post/" + postId, {
		method: "GET",
		headers: {
			"Authorization": "Bearer " + accessToken
		},
	}).then(function (response) {
		return response.json()
	}).then(function (post) {

		document.getElementById("edit-post-title").value = post.title
		document.getElementById("edit-post-body").value = post.body

	}).catch(function (error) {
		console.log(error)
		alert(error)
	})

}
document.getElementById("edit-post-button").addEventListener("click", async function (event) {
	event.preventDefault()
	
	const postTitle = document.getElementById("edit-post-title").value
	const postBody = document.getElementById("edit-post-body").value

	fetch(defaultAddress.URL+":"+defaultAddress.PORT+"/api/posts/edit/"+cachedPostId, {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
			"Authorization": "Bearer " + accessToken
		},
		body: JSON.stringify({ 	
			id: cachedPostId,
			title: postTitle,
			body: postBody,
			accountId: userInfo.sub })
	}).then(function (response) {
		console.log(response)
	}).catch(function (error) {
		console.log(error)
		alert(error)
	})

})
