function deletePostPage(postId) {
	fetch(defaultAddress.URL + ":" + defaultAddress.PORT + "/api/posts/delete/" + postId, {
		method: "DELETE",
		headers: {
			"Authorization": "Bearer " + accessToken
		},
	}).then(function (response) {
		console.log(response)
		//changePage("/posts")
	}).catch(function (error) {
		console.log(error)
		alert(error)
	})
}
