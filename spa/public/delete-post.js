
function deletePostPage(postId) {
    fetch("http://192.168.99.100:8080/api/delete-your-post/" + postId, {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
				"Authorization": "Bearer " + accessToken
			},
		}).then(function (response) {
            console.log(response)
            changePage("/posts")
		}).catch(function (error) {
			console.log(error)
			alert(error)
        })
}
