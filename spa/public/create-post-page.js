document.addEventListener("DOMContentLoaded", function(){
	
	const createPost = document.querySelector("#create-post-page form")
	
	createPost.addEventListener("submit", function(event){
		event.preventDefault()
		
		const title = document.getElementById("post-title").value
		const postContent = document.getElementById("post-content").value
		
		fetch("http://192.168.99.100:8080/api/new-post", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				"Authorization": "Bearer "+accessToken
			},
			body: JSON.stringify({title: title, post: postContent, accountId: userInfo.sub, username:userInfo.preferred_username })
		}).then(function(response){
			console.log(response)
		}).catch(function(error){
			console.log(error)
			alert(error)
		})
		
	})
	
})