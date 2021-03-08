var userInfo
var accessToken

document.addEventListener("DOMContentLoaded", function () {

	const signInForm = document.querySelector("#sign-in-page form")

	signInForm.addEventListener("submit", function (event) {
		event.preventDefault()

		const username = document.getElementById("sign-in-username").value
		const password = document.getElementById("sign-in-password").value

		fetch("http://192.168.99.100:8080/api/tokens", {
			method: "POST",
			headers: {
				"Content-Type": "application/x-www-form-urlencoded"
			},
			body: "grant_type=password&username=" + encodeURI(username) + "&password=" + encodeURI(password)
		}).then(function (response) {
			return response.json()
		}).then(function (body) {

			accessToken = body.access_token
			const idToken = body.id_token

			userInfo = jwt_decode(idToken)

			document.querySelector("nav").classList.add("user-is-logged-in")

			changePage("/posts")

		}).catch(function (error) {
			alert('Something went wrong')
			console.log(error)
		})

	})

})