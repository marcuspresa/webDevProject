
document.addEventListener("DOMContentLoaded", function () {

	const signUpForm = document.querySelector("#sign-up-page form")
	
		signUpForm.addEventListener("submit", function (event) {
		event.preventDefault()

		const username = document.getElementById("sign-up-username").value
		const password = document.getElementById("sign-up-password").value

		fetch("http://192.168.99.100:8080/api/account", {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				username: username,
				password: password
			})
		}).then(function (response) {
			console.log(response)
			return response.json()
		}).catch(function (error) {
			console.log(error)
		})
		
		
	})

})