
document.addEventListener("DOMContentLoaded", function () {
	const signUpForm = document.querySelector("#sign-up-page form")

		signUpForm.addEventListener("submit", function (event) {
		event.preventDefault()
		const username = document.getElementById("sign-up-username").value
		const password = document.getElementById("sign-up-password").value
		alert(username)
		fetch("http://192.168.99.100:8080/api/createaccount", {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({ username: username, password: password }),
			alert(body)
		}).then(function (response) {
			alert(response.json())
			return response.json()
		}).catch(function (error) {
			alert(error)
		})
		
		
	})

})