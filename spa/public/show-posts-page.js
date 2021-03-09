
const config = require("../config")

function updateShowPostPage(){
	
	fetch(config.defaultURL+":"+defaultPORT+"/api/posts", {
		method: "GET",
		headers: {
			"Authorization": "Bearer "+accessToken
		},
	}).then(function(response){
		return response.json()
	}).then(function(posts){
		const ul = document.querySelector("#show-posts-page ul")
		ul.innerText = ""
		for(const post of posts){
			const li = document.createElement("li")
			li.innerText = "Post title: "+ post.title
			ul.appendChild(li)
		}		
	}).catch(function(error){
		console.log(error)
		alert(error)
	})
	
}