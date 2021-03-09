
const config = require("../config")

function deletePostPage(postId) {
    fetch(config.defaultURL+":"+defaultPORT+"/api/delete-your-post/" + postId, {
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
