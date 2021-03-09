
const config = require("../config")

function getYourPost() {

	fetch(config.defaultURL+":"+defaultPORT+"/api/your-posts/"+userInfo.sub, {
		method: "GET",
		headers: {
			"Authorization": "Bearer " + accessToken
		},
	}).then(function (response) {
		return response.json()
	}).then(function (posts) {

		const ul = document.querySelector("#your-posts-page ul")
		ul.innerText = ""
		for (const post of posts) {
			const li = document.createElement("li")
			const a = document.createElement("a")
			const buttonDelete = document.createElement("a")
			const space = document.createElement("span")
			a.innerText = "Your post title: "+post.title
			buttonDelete.innerText = "delete"
			space.innerText = " "
			a.setAttribute("href", "/your-post/" + post.id)
			buttonDelete.setAttribute("href", "/delete-your-post/" + post.id)
			a.addEventListener("click", handleClickOnAnchor)
			a.addEventListener("click", handleClickOnAnchor)
			buttonDelete.addEventListener("click", handleClickOnAnchor)
			li.appendChild(a)
			li.appendChild(space)
			li.appendChild(buttonDelete)
			ul.appendChild(li)
		
		}
		
	}).catch(function (error) {
		console.log(error)
		alert(error)
	})

}