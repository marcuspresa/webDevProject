document.getElementById("sign-up-button").addEventListener("click", async function (event) {
	event.preventDefault();
	const username = document.getElementById("sign-up-username").value;
	const password = document.getElementById("sign-up-password").value;
	const result = await fetch(defaultAddress.URL + ":" + defaultAddress.PORT + "/api/createaccount", {
		method: "POST",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify({ username: username, password: password })

	}).catch(function (error) {
		console.log(error)
	})
	const json = await result.json();
	if (json.message === "Ok") {
		alert("OK")
		changePage("/login")
	} else {
		document.querySelector("#signUpError").innerText = json; 
	}
});



