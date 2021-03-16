var userInfo
var accessToken
var idToken
document.getElementById("sign-in-button").addEventListener("click", async function (event) {
	event.preventDefault();
	const username = document.getElementById("sign-in-username").value;
	const password = document.getElementById("sign-in-password").value;
	fetch(defaultAddress.URL+":"+defaultAddress.PORT+"/api/tokens", {
		method: "POST",
		headers: {
			"Content-Type": "application/x-www-form-urlencoded"
		},
		body: "grant_type=password&username=" + encodeURI(username) + "&password=" + encodeURI(password)
	}).then(function (response) {
		return response.json();
	}).then(function (body) {
		accessToken = body.access_token;
		idToken = body.id_token;
		userInfo = jwt_decode(idToken);
		document.querySelector("nav").classList.add("user-is-logged-in");
		document.getElementById("username").innerText = userInfo.preferred_username;
	}).catch(function (error) {
		console.log(error)
		//const errorText = document.getElementById("loginError")
		//if (error = "InvalidTokenError: Invalid token specified") {
		//	errorText.innerText = "Wrong credentials!"
		//}
	})
})